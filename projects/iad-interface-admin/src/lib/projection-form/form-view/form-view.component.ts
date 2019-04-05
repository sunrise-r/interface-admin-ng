import {AfterContentInit, Component, Input} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroupChild, FormGroupChildColumn, FormInputGroup} from '../../customize/dynamic-form/form-input-group';
import {LookupInputModel} from '../inputs/lookup-input.model';
import {MultipleLookupInputModel} from '../inputs/multiple-lookup-input.model';
import {GenderSelectionDropdownInput} from '../inputs/gender-selection-dropdown-input.model';
import {IadFormProjection, IadFormProjectionInterface} from '../model/projection-form.model';
import {DISABLED, IFormProjectionField, READONLY} from '../model/form-projection-field.model';
import {FormInput} from '../../customize/dynamic-form/inputs/form-input.model';
import {InputFactory} from '../../customize/dynamic-form/inputs/input.factory';
import {IadReferenceProjectionProviderService} from '../../public-services/iad-reference-projection-provider.service';
import {IadDataOperationsService} from '../../public-services/iad-data-operations.service';
import {IadRouterHistoryService} from '../../public-services/iad-router-history.service';
import {Router} from '@angular/router';

export type FormGroupChildCallback = (IFormProjectionField) => FormGroupChild;

const typeFactory = {
    List: MultipleLookupInputModel,
    Entity: LookupInputModel,
    GenderSelectionDropdown: GenderSelectionDropdownInput
};

const inputComponents = {
};

@Component({
    selector: 'iad-form-view',
    templateUrl: './form-view.component.html',
    styles: []
})
export class FormViewComponent implements AfterContentInit {
    /**
     * Код нажатой в тулбаре кнопки
     */
    actionCode: string;

    /**
     * Инпуты формы для передачи в компонент генератора формы
     */
    formInputGroup: FormInputGroup;

    /**
     * Проекция по которой строится форма
     */
    @Input('projection')
    formProjection: IadFormProjection;

    @Input()
    projectionService: IadReferenceProjectionProviderService;

    /**
     * Компоненты инпутов для передачи в модуль форм-билдера
     */
    inputComponents = inputComponents;

    /**
     * Предустановленные значения для полей формы
     */
    predefinedValues: any;


  /**
     * Raw data to fill the form
     */
    @Input()
    rawFormData: any;

    /**
     * Ошибка сервера, если отправка данных прошла не успешно
     */
    serverError: HttpErrorResponse;

    constructor(
        private iadDataOperationsService: IadDataOperationsService,
        private iadRouterHistoryService: IadRouterHistoryService,
        private router: Router
    ) {}

    ngAfterContentInit() {
        this.initForm();
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
                .then((data: {[param: string]: IadFormProjectionInterface}) => {
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
    initInputAndGroup(field: IFormProjectionField, groups: {[param: string]: IadFormProjectionInterface} ): FormGroupChild {
        if (field.type === 'ProjectionReference') {
            const dataKey = field.presentationCode + '.' + field.referenceProjectionCode;
            if (groups[dataKey]) {
                const inputs = this.initInputs(groups[dataKey].fields, field.name);
                return new FormInputGroup({
                    column: field.column,
                    key: field.name,
                    label: field.label,
                    translate: field.translate,
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
            dataSourcePath: field.dataSourcePath || null,
            // TODO: set default value to false after the according field is added to form projections
            translate: field.translate || true
        };
        if (field.properties) {
            Object.assign(options, field.properties);
        }
        return new InputFactory().initTypeFactory(typeFactory).createInput(field.type, this.modifyOptions(options, field, groupName));
    }

    onFormSubmit(value: any) {
      this.iadDataOperationsService.saveData(value).subscribe(
        (response: any) => this.redirect(),
        (err: any) => this.onError(err));
    }

    /**
     * при отказе от заполнения формы просто редиректим к списку
     */
    onFormCancel() {
        this.redirect();
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
            options.value = this.rawFormData ? this.rawFormData[field.name] : null;
        }
        return options;
    }

    /**
     * При успешной отправке данных редиректисм пользователя к списку
     */
    private redirect() {
      this.router.navigate([this.iadRouterHistoryService.previousUrl]);
    }

    /**
     * При ошибке сервера нужно показать информацию пользователю
     * @param err
     */
    private onError(err: HttpErrorResponse) {
        this.serverError = err;
    }
}
