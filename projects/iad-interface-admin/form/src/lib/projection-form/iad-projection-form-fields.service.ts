import { Injectable } from '@angular/core';
import { IFormProjectionField } from './model/form-projection-field.model';
import { IadFormProjectionInterface } from './model/iad-form-projection.model';
import { ProjectionFormHelper } from './iad-projection-form-helper';
import { IadReferenceProjectionProviderService } from './public-services/iad-reference-projection-provider.service';

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

/**
 * Алго 1
 * Получаем список полей
 * Ищем все ссылочные-поля
 * если нет ссылочных-полей, возвращаем поля как есть
 * Если есть ссылочные-поля - делаем запрос, запоминая какие поля были ссылочные
 *
 * Алго 2
 * После получения ответа с проекциями
 * Для каждой проекции ставим соответствие проекции ссылочному филду и вытаскиваем филды
 * Далее проходим алгоритм объединения ссылочных полей,если у них установлен flattenData
 * Для каждой проекции проходим Алго 1 и Алго 2
 *
 * возвращаем промис, содержащий конечныей набор филдов базового уровня и список данных филдов всех вложенных не-сплющеных форм
 */
@Injectable()
export class IadProjectionFormFieldsService {

    /**
     * Default flattenData state to get form input values
     */
    private flattenData: boolean;

    constructor(public referenceProjectionService: IadReferenceProjectionProviderService) {}

    initFormFields(baseProjection: IadFormProjectionInterface): Promise<FieldsInitializationModel> {
        const referenceFields = ProjectionFormHelper.findReferenceFields(baseProjection.fields);
        const model = new FieldsInitializationModel();
        model.setFields(baseProjection.fields);
        model.setReferenceFields(referenceFields);
        return this.initFormFieldsRecursive(model);
    }

    /**
     * Set state of the flag Flaten for data
     * @param flattenData
     */
    setFlattenDataState(flattenData: boolean) {
        this.flattenData = flattenData;
        return this;
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
            }
            if (ProjectionFormHelper.checkFlattenDataState(field, this.flattenData)) {
                result = result.concat(ProjectionFormHelper.getFields(field, referenceFormProjections));
            } else {
                result = result.concat(ProjectionFormHelper.updateReferenceFields(field, referenceFormProjections));
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
}
