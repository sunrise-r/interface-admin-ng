import { IFormProjectionField } from './form-projection-field.model';

export class FieldsInitializationModel {
    private _fields: IFormProjectionField[];
    private _referenceFields: IFormProjectionField[];

    getFields(): IFormProjectionField[] {
        return this._fields;
    }

    setFields(value: IFormProjectionField[]) {
        this._fields = value;
    }

    getReferenceFields(): IFormProjectionField[] {
        return this._referenceFields;
    }

    setReferenceFields(value: IFormProjectionField[]) {
        this._referenceFields = value;
    }
}
