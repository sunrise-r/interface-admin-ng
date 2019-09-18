import { Injectable } from '@angular/core';
import { DISABLED, IFormProjectionField, READONLY } from './model/form-projection-field.model';
import { IadFormProjection, IadFormProjectionInterface } from './model/iad-form-projection.model';
import { IadReferenceProjectionProviderService } from './public-services/iad-reference-projection-provider.service';
import { FormGroupChild, FormGroupChildColumn, FormInputGroup, FormInputGroupInterface } from '../dynamic-form/core/form-input-group';
import { FormGroupChildCallback } from './iad-projection-form.component';
import { FormInput } from '../dynamic-form/core/form-input.model';
import { InputFactory } from '../dynamic-form/core/input.factory';

// @dynamic
export class ProjectionFormHelper {

    static checkFlattenDataState(field, def?: boolean): boolean {
        let state: boolean;
        if ('checkFlattenDataState' in field) {
            state = (<FormInputGroupInterface>field).checkFlattenDataState();
            return state !== undefined ? state : def || false;
        }
        // return false always when we deal with non-groups
        return false;
    }

    /**
     * Resolve source items for lookupViewProjections
     */
    static resolveItemsPath(path: string, dataSource: any): any {
        return dataSource ? path.split('.').reduce((o, i) => (o ? o[i] : undefined), dataSource) : dataSource;
    }

    /**
     * filters Reference fields
     */
    static findReferenceFields(fields: IFormProjectionField[]): IFormProjectionField[] {
        return fields.filter((field: IFormProjectionField) => field.type === 'ProjectionReference');
    }

    /**
     * collect reference form projection codes
     * @param fields
     * @param keyField
     * @param valField
     */
    static generateRequestParams(fields, keyField: string, valField: string) {
        return fields.reduce((acu, field) => {
            if (!acu[field[keyField]]) {
                acu[field[keyField]] = [];
            }
            acu[field[keyField]].push(field[valField]);
            return acu;
        }, {});
    }

    /**
     * flatten data state condition check
     * @param cond
     * @param valid
     * @param invalid
     * @param field
     */
    static plainReferenceCondition(cond, valid, invalid, field) {
        return cond(field) ? valid(field) : invalid(field);
    }
}

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

    constructor(public referenceProjectionService: IadReferenceProjectionProviderService) {
    }

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
        const fields = options.formProjection.fields;
        const referenceFields = ProjectionFormHelper.findReferenceFields(fields);
        return this.initFormFieldsRecursive(fields, referenceFields)
            .then((result) => {
                return new FormInputGroup({
                    children: this.initFormGroupChildColumns(result.fields, field => this.initInputAndGroup(field, result.data))
                });
            })
            .catch(err => {
                console.error(err);
                return new FormInputGroup({});
            });
    }

    /**
     * Initialize reference form projections recursive.
     * If a field, referring on form projection is marked as plainReference, it's referred projection fields will be flatten
     * This properties may seem incorrect:
     * ** We cannot use same projectionReference twice
     *
     * @param fields
     * @param referenceFields
     * @param data
     */
    initFormFieldsRecursive(
        fields: IFormProjectionField[],
        referenceFields: IFormProjectionField[],
        data?: { [param: string]: IadFormProjectionInterface }
    ): Promise<{ fields: IFormProjectionField[], referenceFields: IFormProjectionField[], data: { [param: string]: IadFormProjectionInterface } }> {

        // Check if there any nested references in the form; If no more references, then resolve
        if (!referenceFields || referenceFields.length === 0) {
            return Promise.resolve({fields, referenceFields, data});
        }
        // Request reference form projections
        const requestParams = ProjectionFormHelper.generateRequestParams(referenceFields, 'presentationCode', 'referenceProjectionCode');
        return this.referenceProjectionService
            .findFormProjectionsByName(requestParams)
            .toPromise()
            .then((_data: { [param: string]: IadFormProjectionInterface }) => {
                fields = fields.reduce((acu, field) => acu.concat(
                    ProjectionFormHelper.plainReferenceCondition(
                        (_f) => ProjectionFormHelper.checkFlattenDataState(_f, this.flattenData),
                        (_f) => _data[_f.presentationCode + '.' + _f.referenceProjectionCode].fields,
                        (_f) => [_f], field)), []);
                // Find all nested form references
                const _referenceFields = Object.keys(_data).reduce((acu, key) => acu.concat(ProjectionFormHelper.findReferenceFields(_data[key].fields)), []);
                return this.initFormFieldsRecursive(fields, _referenceFields, Object.assign({}, data, _data));
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
     * @param projections referenceFields (groups) available in current form
     * @param groupName referenceFields (groups) available in current form
     * @param flattenData
     */
    initInputAndGroup(field: IFormProjectionField, projections: { [param: string]: IadFormProjectionInterface }, groupName?: string, flattenData?: boolean): FormGroupChild {
        return field.type === 'ProjectionReference' ? this.initFormGroup(field, projections) : this.initFormInput(field, groupName, flattenData);
    }

    /**
     * Initializes
     * @param field
     * @param groups
     */
    initFormGroup(field: IFormProjectionField, groups: { [param: string]: IadFormProjectionInterface }) {
        const dataKey = field.presentationCode + '.' + field.referenceProjectionCode;
        if (!groups[dataKey]) {
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
        return group.addChildren(this.initFormGroupChildColumns(groups[dataKey].fields, _field => (
            this.initInputAndGroup(_field, groups, field.name, group.checkFlattenDataState())
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
