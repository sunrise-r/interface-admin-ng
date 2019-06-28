import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output, QueryList,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { PrimeTemplate } from 'primeng/shared';
import { IadHelper } from 'iad-interface-admin/core';

import { DISABLED, IFormProjectionField, READONLY } from './model/form-projection-field.model';

import { FormInput } from '../dynamic-form/core/form-input.model';
import { InputFactory } from '../dynamic-form/core/input.factory';
import { FormGroupChild, FormGroupChildColumn, FormInputGroup } from '../dynamic-form/core/form-input-group';
import { IadFormProjection, IadFormProjectionInterface } from './model/iad-form-projection.model';

import { IadReferenceProjectionProviderInterface } from './iad-reference-projection-provider.interface';
import { IadReferenceProjectionProviderService } from './public-services/iad-reference-projection-provider.service';

import { IadDataOperationsService } from './public-services/iad-data-operations.service';
import { IadRouterHistoryService } from './public-services/iad-router-history.service';

export type FormGroupChildCallback = (IFormProjectionField) => FormGroupChild;

/**
 * Важное отличие от projection-form проекта partner в том, что все вложенные формы делаются plain. Нужно сделать такую настройку
 */
@Component({
    selector: 'iad-projection-form',
    templateUrl: './iad-projection-form.component.html',
    styleUrls: ['./iad-projection-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IadProjectionFormComponent implements OnChanges {

    @Input()
    set data(data: any) {
        console.log('Using of "data" is not supported. Use rawFormData instead');
        console.log('data payload:');
        console.log(data);
        console.log('rawFormData payload:');
        console.log(this.rawFormData);
    }

    /**
     * Проекция по которой строится форма
     */
    @Input() formProjection: IadFormProjection;

    /**
     * Компоненты инпутов для передачи в модуль форм-билдера
     */
    @Input() inputComponents;

    /**
     * Модели конфигов для инпутов
     */
    @Input() inputModels;

    /**
     * Raw data to fill the form
     */
    @Input() rawFormData: any;

    /**
     * Default Data source path to fill the form
     */
    @Input() defaultSourcePath: string;

    /**
     * Default Data source path to fill the form
     */
    @Input() considerSourcePathGroups: boolean;

    /**
     * Ошибка сервера, если отправка данных прошла не успешно
     */
    @Input() serverError: HttpErrorResponse;

    /**
     * Subject to force form initialization
     */
    @Input() formProjectionSubject: Subject<{ [param: string]: any }>;

    /**
     * Style CSS class string
     */
    @Input() styleClass: string;

    /**
     * Customized form Footer template
     */
    @Input()
    set formExternalTemplates(templates: QueryList<PrimeTemplate>) {
        this.formTemplates = templates;
    }

    /**
     * Output EventEmitter to handle form submit event externally
     */
    @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Output EventEmitter to handle form cancel event externally
     */
    @Output() formCancel: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Templates to pass to dynamic form
     */
    @ContentChildren(PrimeTemplate) formTemplates: QueryList<PrimeTemplate>;

    /**
     * Инпуты формы для передачи в компонент генератора формы
     */
    formInputGroup: FormInputGroup;

    constructor(
        private iadDataOperationsService: IadDataOperationsService,
        private iadRouterHistoryService: IadRouterHistoryService,
        private referenceProjectionService: IadReferenceProjectionProviderService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('formProjectionSubject' in changes) {
            this.formProjectionSubject.subscribe((data) => {
                this.formProjection = data['projection'];
                this.rawFormData = data['rawFormData'];
                this.initForm();
            });
        }
        if (('formProjection' in changes || 'rawFormData' in changes) && this.formProjection) {
            this.initForm();
        }
    }

    /**
     * Инициализирует форму с группами ProjectionReference и колонками column
     */
    initForm() {
        const fields = this.formProjection.fields;
        const referenceFields = this.findReferenceFields(fields);
        if (referenceFields.length > 0) {
            this.initSubForms(fields, referenceFields)
                .then((formInputGroup) => {
                    this.formInputGroup = formInputGroup;
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            this.formInputGroup = new FormInputGroup({children: this.initInputs(fields)});
        }
    }

    /**
     * filters Reference fields
     */
    findReferenceFields(fields: IFormProjectionField[]): IFormProjectionField[] {
        return fields.filter((field: IFormProjectionField) => field.type === 'ProjectionReference');
    }

    /**
     * Initialize reference form projections.
     * If a field, referring on form projection is marked as plainReference, it's referred projection fields will be flatten
     * @param fields
     * @param referenceFields
     */
    initSubForms(fields: IFormProjectionField[], referenceFields: IFormProjectionField[]): Promise<FormInputGroup> {
        // collect reference form projection codes
        const requestParams = referenceFields.reduce((acu, field) => {
            if (!acu[field.presentationCode]) {
                acu[field.presentationCode] = [];
            }
            acu[field.presentationCode].push(field.referenceProjectionCode);
            return acu;
        }, {});
        // will not show collapse component and will not group reference fields to substructure
        const checkPlainReference = function (field) {
            return field.properties && field.properties.plainReference && !field.properties.considerGroup;
        };
        const plainReferenceCondition = function (cond, valid, invalid, field) {
            return cond(field) ? valid() : invalid();
        };

        // Request reference form projections
        return this.referenceProjectionService
            .findProjectionsByName(requestParams)
            .toPromise()
            .then((data: { [param: string]: IadFormProjectionInterface }) => {
                fields = fields.reduce((acu, field) => acu.concat(
                    plainReferenceCondition(checkPlainReference,
                    () => data[field.presentationCode + '.' + field.referenceProjectionCode].fields,
                    () => [field], field)), []);
                return new FormInputGroup({
                    children: this.initFormGroupChildColumns(fields, field => this.initInputAndGroup(field, data))
                });
            });
    }

    /**
     * Иницуиализация инпутов (будут преобразованы в FormControl)
     * @param fields
     * @param groupName
     */
    initInputs(fields: IFormProjectionField[], groupName?: string): FormGroupChildColumn[] {
        return this.initFormGroupChildColumns(fields, field => this.initFormInput(field, groupName));
    }

    /**
     * Разбивает инпуты и группы по колонкам
     * @param fields
     * @param callback
     */
    initFormGroupChildColumns(fields: IFormProjectionField[], callback: FormGroupChildCallback): FormGroupChildColumn[] {
        const result: FormGroupChildColumn[] = [];
        let columns: FormGroupChildColumn = [];
        fields.forEach((field: IFormProjectionField) => {
            if (field.column && (field.column === 1 || field.column === 2)) {
                columns.push(callback(field));
                if (field.column === 2) {
                    result.push(columns);
                    columns = [];
                }
            } else {
                if (columns.length > 0) {
                    result.push(columns);
                    columns = [];
                }
                const formGroupChild = callback(field);
                if (formGroupChild) {
                    result.push([formGroupChild]);
                } else {
                    console.error('No projections for ' + field.name);
                }
            }
        });
        return result;
    }

    /**
     * Инициализирует список групп инпутов (будут преобразованы в FormGroup) и инпутов (будут преобразованы в FormControl)
     * @param field
     * @param groups
     */
    initInputAndGroup(field: IFormProjectionField, groups: {[param: string]: IadFormProjectionInterface}): FormGroupChild {
        if (field.type === 'ProjectionReference') {
            const dataKey = field.presentationCode + '.' + field.referenceProjectionCode;
            if (groups[dataKey]) {
                const inputs = this.initInputs(groups[dataKey].fields, field.name);
                return new FormInputGroup({
                    column: field.column,
                    key: field.name,
                    label: field.label,
                    validators: field.validationTypes,
                    translate: field.translate,
                    properties: field.properties,
                    children: inputs
                });
            }
        } else {
            return this.initFormInput(field);
        }
    }

    /**
     * Инициализирует FormInput для DTO (информации о поле проекции), который (будут преобразованы в FormControl)
     * @param field
     * @param groupName
     */
    initFormInput(field: IFormProjectionField, groupName?: string): FormInput<any> {
        const options: any = {
            column: field.column,
            key: field.name,
            label: field.label,
            validators: field.validationTypes,
            disabled: field.fieldInputType && field.fieldInputType === DISABLED,
            readonly: field.fieldInputType && field.fieldInputType === READONLY,
            value: field.defaultValue || '',
            presentationCode: field.presentationCode || null,
            lookupSourceProjectionCode: field.lookupSourceProjectionCode || null,
            lookupViewProjectionCode: field.lookupViewProjectionCode || null,
            referenceProjectionCode: field.referenceProjectionCode || null,
            inputMask: field.inputMask || null,
            valueField: field.valueField,
            dataSourcePath: field.datasourcePath || field.dataSourcePath || null,
            translate: field.translate || false
        };
        if (field.properties) {
            Object.assign(options, field.properties);
        }
        return new InputFactory().initTypeFactory(this.inputModels).createInput(field.type, this.modifyOptions(options, groupName));
    }

    onFormSubmit(value: any) {
        const fileInputKeys = this.findFileInputsRecursive(this.formInputGroup);
        this.formSubmit.emit({
            formData: value,
            fileInputKeys
        });
    }

    /**
     * при отказе от заполнения формы просто редиректим к списку
     */
    onFormCancel() {
        this.formCancel.emit();
    }

    /**
     * Рекурсивный поиск ключей инпутов типа file..
     * @param group FormInputGroup
     * @param parentInput string
     */
    private findFileInputsRecursive(group: FormGroupChild, parentInput = ''): string[] {
        let fileInputs: string[] = [];
        (<FormInputGroup>group).children.forEach((childColumn: FormGroupChildColumn) => {
            childColumn.forEach((child: FormGroupChild) => {
                const childKey = (parentInput ? parentInput + '.' : '') + child.key;
                if ((<FormInputGroup>child).children) {
                    fileInputs = fileInputs.concat(this.findFileInputsRecursive(child, childKey));
                } else if (child.controlType === 'file') {
                    fileInputs.push(childKey);
                }
            });
        });
        return fileInputs;
    }

    /**
     * Модифицирует опции перед передачей их в dynamic-form.component
     * @param options
     * @param groupName
     */
    private modifyOptions(options, groupName?: string): { [param: string]: any } {
        if (!options.value && this.rawFormData) {
            options.value = options.dataSourcePath
                ? this.resolveItemsPath(options.dataSourcePath, this.rawFormData)
                : (this.resolveItemsPath((this.defaultSourcePath ? this.defaultSourcePath + '.' : '') +
                    (!options.plainReference && this.considerSourcePathGroups && groupName ? groupName + '.' : '') +
                    options.key, this.rawFormData));
        }
        return options;
    }

    /**
     * Resolve source items for lookupViewProjections
     */
    private resolveItemsPath(path: string, dataSource: any): any {
        return dataSource ? path.split('.').reduce((o, i) => (o ? o[i] : undefined), dataSource) : dataSource;
    }
}
