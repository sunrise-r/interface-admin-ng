import { Component, OnInit, Output, EventEmitter, Input, ContentChildren, QueryList } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { PrimeTemplate } from 'primeng/shared';

import {IadFormProjection, IadFormProjectionInterface} from '../../projection-form/model/iad-form-projection.model';
import {ProjectionsApiService} from '../services/projections-api.service';
import {READONLY, DISABLED, IFormProjectionField} from '../../projection-form/model/form-projection-field.model';
import {FormInput} from '../../dynamic-form/core/form-input.model';
import {InputFactory} from '../../dynamic-form/core/input.factory';
import {FormGroupChild, FormGroupChildColumn, FormInputGroup} from '../../dynamic-form/core/form-input-group';

export type FormGroupChildCallback = (IFormProjectionField) => FormGroupChild;

@Component({
    selector: 'iad-projection-form',
    templateUrl: './projection-form.component.html',
    styles: []
})
export class ProjectionFormComponent implements OnInit {
    /**
     * Предустановленные значения для полей формы
     */
    @Input() data: any;

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
     * Ошибка сервера, если отправка данных прошла не успешно
     */
    @Input() serverError: HttpErrorResponse;

    @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() formCancel: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Templates to pass to dynamic form
     */
    @ContentChildren(PrimeTemplate) formTemplates: QueryList<PrimeTemplate>;

    /**
     * Инпуты формы для передачи в компонент генератора формы
     */
    formInputGroup: FormInputGroup;

    constructor(private projectionService: ProjectionsApiService) {}

    ngOnInit() {
        this.initForm();
    }
    /**
     * Инициализирует форму с группами ProjectionReference и колонками column
     */
    initForm() {

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
            datasourcePath: field.datasourcePath || field.dataSourcePath || null
        };
        if (field.properties) {
            Object.assign(options, field.properties);
        }
        return new InputFactory().initTypeFactory(this.inputModels).createInput(field.type, this.modifyOptions(options, field, groupName));
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
     * @param field
     * @param groupName
     */
    private modifyOptions(options, field: IFormProjectionField, groupName?: string): { [param: string]: any } {
        if (this.data) {
            const data = groupName && this.data[groupName] ? this.data[groupName] : this.data;
            if (options.key in data) {
                options.value = data[options.key];
            }
        }
        if (!options.value && this.rawFormData) {
            options.value = field.datasourcePath
                ? this.resolveItemsPath(field.datasourcePath, this.rawFormData)
                : this.rawFormData.properties ? this.rawFormData.properties[field.name] : null;
        }
        return options;
    }

    /**
     * Resolve source items for lookupViewProjections
     */
    private resolveItemsPath(path: string, selection: any): any {
        return selection ? path.split('.').reduce((o, i) => (o ? o[i] : undefined), selection) : selection;
    }
}
