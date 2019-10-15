import { Injectable } from '@angular/core';
import { DISABLED, IFormProjectionField, READONLY } from './model/form-projection-field.model';
import { IadFormProjection, IadFormProjectionInterface } from './model/iad-form-projection.model';
import { FormGroupChild, FormGroupChildColumn, FormInputGroup } from '../dynamic-form/core/form-input-group';
import { FormGroupChildCallback } from './iad-projection-form.component';
import { FormInput } from '../dynamic-form/core/form-input.model';
import { InputFactory } from '../dynamic-form/core/input.factory';
import { ProjectionFormHelper } from './iad-projection-form-helper';
import { FieldsInitializationModel } from './model/fields-initialization.model';
import { IadReferenceProjectionProviderService } from './public-services/iad-reference-projection-provider.service';

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

    constructor(public referenceProjectionService: IadReferenceProjectionProviderService) {}

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
        const referenceFields = ProjectionFormHelper.findReferenceFields(options.formProjection.fields);
        const model = new FieldsInitializationModel();
        model.setFields(options.formProjection.fields);
        model.setReferenceFields(referenceFields);
        return this.initFormFieldsRecursive(model)
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
     * Update values
     * @param group
     * @param groupName
     * @param flattenData
     * @param rawFormData
     */
    updateFormValues(group: FormGroupChild, groupName?: string, flattenData?: boolean, rawFormData?: any) {
        if (rawFormData) {
            this.rawFormData = rawFormData;
        }
        if ('children' in group) {
            (<FormInputGroup>group).children
                .reduce((acu, child: FormGroupChildColumn) => acu.concat(child), [])
                .forEach((child: FormGroupChild) => {
                    if ('value' in child) {
                        this.updateInputValue((<FormInput<any>>child), group.key, group.checkFlattenDataState());
                    } else {
                        this.updateFormValues(<FormInputGroup>child, groupName, flattenData);
                    }
                });
        } else {
            this.updateInputValue((<FormInput<any>>group), groupName, flattenData);
        }
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
            .createInput(field.type, this.updateInputValue(options, groupName, flattenData));
    }

    /**
     * Initialize reference form projections recursive.
     * If a field, referring on form projection is marked as plainReference, it's referred projection fields will be flatten
     * This properties may seem incorrect:
     * ** We cannot use same projectionReference twice
     *
     * @param model
     */
    initFormFieldsRecursive(model: FieldsInitializationModel): Promise<FieldsInitializationModel> {
        // Check if there any nested references in the form; If no more references, then resolve
        if (!model.getReferenceFields() || model.getReferenceFields().length === 0) {
            return Promise.resolve(model);
        }
        return this.requestReferredProjections(model.getReferenceFields())
            .then((projections: { [param: string]: IadFormProjectionInterface }) => {
                const newModel = new FieldsInitializationModel();
                newModel.setFields(this.updateFieldsTree(model.getFields(), projections));
                newModel.setReferenceFields(this.findReferenceFieldsInProjections(projections));
                return this.initFormFieldsRecursive(newModel);
            });
    }

    /**
     * Updates fields tree with reference fields recursive
     * @param fields
     * @param referenceFormProjections
     */
    private updateFieldsTree(fields: IFormProjectionField[], referenceFormProjections: { [param: string]: IadFormProjectionInterface }): IFormProjectionField[] {
        let result: IFormProjectionField[] = [];
        fields.forEach(field => {
            if (field.referenceFields) {
                field.referenceFields = this.updateFieldsTree(field.referenceFields, referenceFormProjections);
                result.push(field);
            } else {
                if (ProjectionFormHelper.checkFlattenDataState(field, this.flattenData)) {
                    result = result.concat(ProjectionFormHelper.getFields(field, referenceFormProjections));
                } else {
                    result.push(ProjectionFormHelper.updateReferenceFields(field, referenceFormProjections));
                }
            }
        });
        return result;
    }

    /**
     * Request projections by presentationCode and projectionCode, taken from current referenceFields
     * @param referenceFields
     */
    private requestReferredProjections(referenceFields): Promise<{ [param: string]: IadFormProjectionInterface }> {
        const requestParams = ProjectionFormHelper.generateRequestParams(referenceFields, 'presentationCode', 'referenceProjectionCode');
        return this.referenceProjectionService.findFormProjectionsByName(requestParams).toPromise();
    }

    /**
     * Find reference fields among the fields of each of given projections
     * @param projections
     */
    private findReferenceFieldsInProjections(projections: { [param: string]: IadFormProjectionInterface }): IFormProjectionField[] {
        return Object.keys(projections).reduce((acu, key) => (
            acu.concat(ProjectionFormHelper.findReferenceFields(projections[key].fields))
        ), []);
    }

    /**
     * Модифицирует опции перед передачей их в dynamic-form.component
     * @param options
     * @param groupName
     * @param flattenData
     */
    private updateInputValue(options, groupName?: string, flattenData?: boolean): { [param: string]: any } {
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
