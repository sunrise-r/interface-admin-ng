import { Injectable } from '@angular/core';
import { DISABLED, IFormProjectionField, READONLY } from './model/form-projection-field.model';
import { IadFormProjection } from './model/iad-form-projection.model';
import { FormGroupChild, FormGroupChildColumn, FormInputGroup } from '../dynamic-form/core/form-input-group';
import { FormGroupChildCallback } from './iad-projection-form.component';
import { FormInput } from '../dynamic-form/core/form-input.model';
import { InputFactory } from '../dynamic-form/core/input.factory';
import { IadProjectionFormFieldsService } from './iad-projection-form-fields.service';
import { ProjectionFormHelper } from './iad-projection-form-helper';

@Injectable()
export class IadProjectionFormService {

    /**
     * Raw data to fill the form
     */
    rawFormData: any;

    /**
     * Default Data source path to fill the form
     */
    defaultSourcePath: string;

    /**
     * Default flattenData state to get form input values
     */
    flattenData: boolean;

    /**
     * Configuration models for each input type
     */
    inputModels: any;

    constructor(public projectionFormFieldsService: IadProjectionFormFieldsService) {}

    /**
     * Initialize form with groups from "ProjectionReference" property and columns from "column" property of
     * each child group
     */
    init(options: {
        formProjection: IadFormProjection,
        inputModels: any,
        rawFormData?: any,
        defaultSourcePath?: string
        flattenData?: boolean
    }): Promise<FormInputGroup> {
        this.rawFormData = options.rawFormData;
        this.defaultSourcePath = options.defaultSourcePath;
        this.flattenData = options.flattenData;
        this.inputModels = options.inputModels;
        return this.projectionFormFieldsService
            .setFlattenDataState(this.flattenData)
            .initFormFields(options.formProjection)
            .then((result) => {
                return new FormInputGroup({
                    children: this.initFormGroupChildColumns(result.getFields(), field => this.initInputAndGroup(field))
                });
            })
            .catch(err => {
                console.error(err);
                return new FormInputGroup({});
            });
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
     * @param field current field or referenceField(Group)
     * @param groupName referenceFields (groups) available in current form
     * @param dataShouldBeFlatten flag to identify if data are flatten
     */
    initInputAndGroup(field: IFormProjectionField, groupName?: string, dataShouldBeFlatten?: boolean): FormGroupChild {
        return field.type === 'ProjectionReference' ? this.initFormGroup(field) : this.initFormInput(field, groupName, dataShouldBeFlatten);
    }

    /**
     * Initializes
     * @param field
     * @param groups
     */
    initFormGroup(field: IFormProjectionField) {
        const dataKey = field.presentationCode + '.' + field.referenceProjectionCode;
        if (!field.referenceFields) {
            throw new Error('ReferenceProjection ' + dataKey + ' is not defined by it\'s key');
        }
        const group = new FormInputGroup({
            column: field.column,
            key: field.name,
            label: field.label,
            validators: field.validationTypes,
            translate: field.translate,
            properties: field.properties
        });
        return group.addChildren(this.initFormGroupChildColumns(field.referenceFields, _field => (
            this.initInputAndGroup(_field, field.name, group.checkFlattenDataState())
        )));
    }

    /**
     * Инициализирует FormInput для DTO (информации о поле проекции), который (будут преобразованы в FormControl)
     * @param field
     * @param groupName
     * @param flattenData
     */
    initFormInput(field: IFormProjectionField, groupName?: string, flattenData?: boolean): FormInput<any> {
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
        return new InputFactory()
            .initTypeFactory(this.inputModels)
            .createInput(field.type, this.modifyOptions(options, groupName, flattenData));
    }

    /**
     * Модифицирует опции перед передачей их в dynamic-form.component
     * @param options
     * @param groupName
     * @param flattenData
     */
    private modifyOptions(options, groupName?: string, flattenData?: boolean): { [param: string]: any } {
        if (!options.value && this.rawFormData) {
            options.value = options.dataSourcePath
                ? ProjectionFormHelper.resolveItemsPath(options.dataSourcePath, this.rawFormData)
                : (ProjectionFormHelper.resolveItemsPath((this.defaultSourcePath ? this.defaultSourcePath + '.' : '') +
                    ((!flattenData && !this.flattenData) && groupName ? groupName + '.' : '') +
                    options.key, this.rawFormData));
        }
        return options;
    }
}
