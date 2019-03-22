import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { JhiLanguageHelper, StateStorageService } from 'app/core';

import { FormGroupChild, FormGroupChildColumn, FormInput, FormInputGroup, InputFactory } from 'app/customize';

import { DocumentOperationsService } from '../services/document-operations.service';

import {
    DocumentFormProjection,
    DocumentFormProjectionGroup,
    PresentationService,
    ProjectionsApiService,
    DISABLED,
    IFormProjectionField,
    READONLY,
    ActualSelectionModel
} from '../../';

import { LookupInputModel } from '../inputs/lookup-input.model';
import { MultipleLookupInputModel } from '../inputs/multiple-lookup-input.model';
import { GenderSelectionDropdownInput } from '../inputs/gender-selection-dropdown-input.model';
import { FormLookupComponent } from '../components/form-lookup-component';
import { FormGenderSelectionDropdownComponent } from '../components/form-gender-selection-dropdown.component';

import { DocumentInfoBufferService } from '../services/document-info-buffer.service';

export type FormGroupChildCallback = (IFormProjectionField) => FormGroupChild;

const typeFactory = {
    List: MultipleLookupInputModel,
    Entity: LookupInputModel,
    GenderSelectionDropdown: GenderSelectionDropdownInput
};

const inputComponents = {
    lookup: FormLookupComponent,
    dropdown: FormGenderSelectionDropdownComponent
};

@Component({
    selector: 'jhi-form-view',
    templateUrl: './form-view.component.html',
    styles: []
})
export class FormViewComponent implements OnInit, OnDestroy {
    /**
     * Код нажатой в тулбаре кнопки
     */
    actionCode: string;

    /**
     * Инпуты формы для передачи в компонент генератора формы
     */
    formInputGroup: FormInputGroup;

    formSenderSubscription: Subscription;

    /**
     * Проекция по которой строится форма
     */
    formProjection: DocumentFormProjection;

    /**
     * Компоненты инпутов для передачи в модуль форм-билдера
     */
    inputComponents = inputComponents;

    /**
     * Номер документа
     */
    operationId: any;

    /**
     * Предустановленные значения для полей формы
     */
    predefinedValues: any;

    /**
     * Raw data to fill the form
     */
    rawFormData: any;

    /**
     * Ошибка сервера, если отправка данных прошла не успешно
     */
    serverError: HttpErrorResponse;

    constructor(
        private activatedRoute: ActivatedRoute,
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private stateStorageService: StateStorageService,
        private presentationService: PresentationService,
        private projectionService: ProjectionsApiService,
        private formSender: DocumentOperationsService,
        private infoBufferService: DocumentInfoBufferService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ action, model, predefinedValues, rawData, operationId }) => {
            if (model) {
                this.formProjection = model;
                this.actionCode = action;
                this.predefinedValues = predefinedValues;
                this.rawFormData = rawData;
                this.operationId = operationId;
                this.jhiLanguageHelper.updateTitle(this.formProjection.title || 'global.title');
                this.initForm();
            }
        });
    }

    ngOnDestroy(): void {
        this.infoBufferService.clear();
    }

    /**
     * Инициализирует форму с группами ProjectionReference и колонками column
     */
    initForm() {
        const referenceFields = this.formProjection.fields.filter((field: IFormProjectionField) => field.type === 'ProjectionReference');
        if (referenceFields.length > 0) {
            const requestParams: any = {};
            referenceFields.forEach(referenceField => {
                if (!requestParams[referenceField.presentationCode]) {
                    requestParams[referenceField.presentationCode] = [];
                }
                requestParams[referenceField.presentationCode].push(referenceField.referenceProjectionCode);
            });
            this.projectionService
                .findProjectionsByName(requestParams)
                .toPromise()
                .then((data: DocumentFormProjectionGroup) => {
                    const fields = this.formProjection.fields.filter((field: IFormProjectionField) => !field.hidden);
                    this.formInputGroup = new FormInputGroup({
                        children: this.initFormGroupChildColumns(fields, field => this.initInputAndGroup(field, data))
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            const fields = this.formProjection.fields.filter((field: IFormProjectionField) => !field.hidden);
            this.formInputGroup = new FormInputGroup({ children: this.initInputs(fields) });
        }
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
    initInputAndGroup(field: IFormProjectionField, groups: DocumentFormProjectionGroup): FormGroupChild {
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
            dataSourcePath: field.dataSourcePath || null
        };
        if (field.properties) {
            Object.assign(options, field.properties);
        }
        return new InputFactory().initTypeFactory(typeFactory).createInput(field.type, this.modifyOptions(options, field, groupName));
    }

    onFormSubmit(value: any) {
        const fileInputKeys = this.findFileInputsRecursive(this.formInputGroup);
        this.formSenderSubscription = this.formSender
            .performOperation(this.actionCode, value, this.formProjection.code, this.operationId, fileInputKeys)
            .subscribe((response: any) => this.redirect(), (err: any) => this.onError(err));
    }

    /**
     * при отказе от заполнения формы просто редиректим к списку
     */
    onFormCancel() {
        this.redirect();
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
        if (this.predefinedValues) {
            const predefinedValues =
                groupName && this.predefinedValues[groupName] ? this.predefinedValues[groupName] : this.predefinedValues;
            if (options.key in predefinedValues) {
                options.value = predefinedValues[options.key];
            }
        }
        if (!options.value && this.rawFormData) {
            options.value = field.dataSourcePath
                ? this.resolveItemsPath(field.dataSourcePath, this.rawFormData)
                : this.rawFormData.properties ? this.rawFormData.properties[field.name] : null;
        }
        return options;
    }

    /**
     * Resolve source items for lookupViewProjections
     */
    private resolveItemsPath(path: string, selection: ActualSelectionModel): any {
        if (!selection) {
            return selection;
        }
        const pathArray = path.split('.');
        let diver: any = selection;
        let level = 0;
        while (level < pathArray.length) {
            diver = diver[pathArray[level]];
            level++;
        }
        return diver;
    }

    /**
     * При успешной отправке данных редиректисм пользователя к списку
     */
    private redirect() {
        let redirect = this.stateStorageService.getUrl();
        if (!redirect) {
            redirect = '/';
        }
        this.stateStorageService.storeUrl(null);
        this.router.navigate([redirect]);
    }

    /**
     * При ошибке сервера нужно показать информацию пользователю
     * @param err
     */
    private onError(err: HttpErrorResponse) {
        this.serverError = err;
    }
}
