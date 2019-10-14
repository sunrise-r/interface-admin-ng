import { FormInputGroupInterface } from '../dynamic-form/core/form-input-group';
import { IFormProjectionField } from './model/form-projection-field.model';
import { IadFormProjectionInterface } from './model/iad-form-projection.model';

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
     * Returns list of referred fields
     * @param field
     * @param referenceFormProjections
     */
    static getFields(field, referenceFormProjections: { [param: string]: IadFormProjectionInterface }) {
        if (field.type !== 'ProjectionReference') {
            return;
        }
        return referenceFormProjections[field.presentationCode + '.' + field.referenceProjectionCode].fields;
    }

    /**
     * Update field's refereed fields list. Have to be called when referred fields shouldn't be flatten
     * @param field
     * @param referenceFormProjections
     */
    static updateReferenceFields(field, referenceFormProjections: { [param: string]: IadFormProjectionInterface }) {
        field.referenceFields = ProjectionFormHelper.getFields(field, referenceFormProjections);
        return [field];
    }
}
