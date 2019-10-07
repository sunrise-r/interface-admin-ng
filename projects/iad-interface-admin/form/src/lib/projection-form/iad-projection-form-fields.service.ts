import { Injectable } from '@angular/core';
import { IFormProjectionField } from './model/form-projection-field.model';
import { IadFormProjectionInterface } from './model/iad-form-projection.model';
import { ProjectionFormHelper } from './iad-projection-form.service';
import { IadReferenceProjectionProviderService } from './public-services/iad-reference-projection-provider.service';

export class FieldsInitializationModel {
    private _fields: IFormProjectionField[];
    private _referenceFields: IFormProjectionField[];
    private _data: { [param: string]: IadFormProjectionInterface };

    constructor(fields: IFormProjectionField[], referenceFields: IFormProjectionField[], data?: { [p: string]: IadFormProjectionInterface }) {
        this._fields = fields;
        this._referenceFields = referenceFields;
        if (data) {
            this._data = data;
        }
    }

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

    getData(): { [p: string]: IadFormProjectionInterface } {
        return this._data;
    }

    setData(value: { [p: string]: IadFormProjectionInterface }) {
        this._data = value;
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

    private fields: IFormProjectionField[];

    private referenceFields: IFormProjectionField[];

    private data: { [param: string]: IadFormProjectionInterface };

    constructor(public referenceProjectionService: IadReferenceProjectionProviderService) {}

    initFormFields(baseProjection: IadFormProjectionInterface): Promise<FieldsInitializationModel> {
        this.updateFields(baseProjection.fields);
        const referenceFields = ProjectionFormHelper.findReferenceFields(baseProjection.fields);
        const model = new FieldsInitializationModel(baseProjection.fields, referenceFields);
        return this.initFormFieldsRecursive(model);
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
                // will update current model fields with flatten fields
                model.setFields(this.updateScopeFields(model.getFields(), projections));
                model.setReferenceFields(this.findReferenceFieldsInProjections(projections));
                model.setData(Object.assign({}, model.getData, projections));
                return this.initFormFieldsRecursive(model);
            });
    }


    updateFields(fields: IFormProjectionField[]): void {
        this.fields = fields;
    }

    /**
     * #АЛГО1
     * смотрим филды в текущем scope
     * Если это вложенка и поля флатен, то мы их мёрджим со всеми полями в текущем scope
     * Иначе поле добавляется как есть в текущем scope
     // Был запрошен референс, поэтому мы можем
     // 1) пробежать по referenceFormProjections
     // 1.1) Для каждого референса найти в филдах поле этого референса
     // 1.2.1) Если у поля flattenData, то запоминаем позицию поля
     // 1.2.1) Отрезаем часть массива полей до этого поля
     // 1.3.1) Иначе ищем вложенные референсы и ползём дальше как раньше
     // Бежим по первому уровню (scope1):

     // Если текущее поле референсное (в referenceFields), то мы ищем его вложенки в data (scope2...n)
     // Для каждой вложенки проверяем #АЛГО1
     * @param fields
     * @param referenceFormProjections
     */
    private updateScopeFields(fields: IFormProjectionField[], referenceFormProjections: { [param: string]: IadFormProjectionInterface }): IFormProjectionField[] {
        return fields.reduce((acu, field) => acu.concat(
            ProjectionFormHelper.plainReferenceCondition(
                (_f) => ProjectionFormHelper.checkFlattenDataState(_f, this.flattenData),
                (_f) => referenceFormProjections[_f.presentationCode + '.' + _f.referenceProjectionCode].fields,
                (_f) => [_f], field)
        ), []);
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
