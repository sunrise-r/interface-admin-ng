import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output, QueryList,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { PrimeTemplate } from 'primeng/shared';

import { FormGroupChild, FormGroupChildColumn, FormInputGroup } from '../dynamic-form/core/form-input-group';
import { IadFormProjection } from './model/iad-form-projection.model';
import { IadProjectionFormService, ProjectionFormHelper } from './iad-projection-form.service';

export type FormGroupChildCallback = (IFormProjectionField) => FormGroupChild;

/**
 * Важное отличие от projection-form проекта partner в том, что все вложенные формы делаются plain. Нужно сделать такую настройку
 */
@Component({
    selector: 'iad-projection-form',
    templateUrl: './iad-projection-form.component.html',
    styleUrls: ['./iad-projection-form.component.scss'],
    providers: [IadProjectionFormService],
    encapsulation: ViewEncapsulation.None
})
export class IadProjectionFormComponent implements OnChanges {

    @Input()
    set data(data: any) {
        console.log('Using of "data" is not supported. Use rawFormData instead');
        console.log('data payload:');
        console.log(data);
        console.log('rawFormData payload:');
        console.log(this.rawFormData);
    }

    /**
     * Проекция по которой строится форма
     */
    @Input() formProjection: IadFormProjection;

    /**
     * Column components to pass them to column td host
     */
    @Input() inputComponents: { [param: string]: any };

    /**
     * Модели конфигов для инпутов
     */
    @Input() inputModels: any;

    /**
     * Raw data to fill the form
     */
    @Input() rawFormData: any;

    /**
     * Default Data source path to fill the form
     */
    @Input() defaultSourcePath: string;

    /**
     * Default flattenData state to get form input values
     */
    @Input() flattenData: boolean;

    /**
     * Ошибка сервера, если отправка данных прошла не успешно
     */
    @Input() serverError: HttpErrorResponse;

    /**
     * Subject to force form initialization
     */
    @Input() formProjectionSubject: Subject<{ [param: string]: any }>;

    /**
     * Style CSS class string
     */
    @Input() styleClass: string;

    /**
     * Customized form Footer template
     */
    @Input()
    set formExternalTemplates(templates: QueryList<PrimeTemplate>) {
        this.formTemplates = templates;
    }

    /**
     * Output EventEmitter to handle form submit event externally
     */
    @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Output EventEmitter to handle form cancel event externally
     */
    @Output() formCancel: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Templates to pass to dynamic form
     */
    @ContentChildren(PrimeTemplate) formTemplates: QueryList<PrimeTemplate>;

    /**
     * Инпуты формы для передачи в компонент генератора формы
     */
    formInputGroup: FormInputGroup;

    constructor(private formProjectionService: IadProjectionFormService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('formProjectionSubject' in changes) {
            this.formProjectionSubject.subscribe((data) => {
                this.formProjection = data['projection'];
                this.rawFormData = data['rawFormData'];
                this.initForm();
            });
        }
        if (('formProjection' in changes || 'rawFormData' in changes) && this.formProjection) {
            this.initForm();
        }
    }

    /**
     * Инициализирует форму с группами ProjectionReference и колонками column
     */
    initForm() {
        this.formProjectionService.init({
                formProjection: this.formProjection,
                defaultSourcePath: this.defaultSourcePath,
                flattenData: this.flattenData,
                inputModels: this.inputModels,
                rawFormData: this.rawFormData
            })
            .then(result => { this.formInputGroup = result; });
    }

    onFormSubmit(formValue: any) {
        const fileInputKeys = this.findFileInputsRecursive(this.formInputGroup);
        // #89 flatten data for groups with flattenData Option or plainReference option
        (<FormInputGroup>this.formInputGroup).children
            .reduce((acu, childColumn: FormGroupChildColumn) => acu.concat(childColumn), [])
            .filter((child: FormGroupChild) => ProjectionFormHelper.checkFlattenDataState(child, this.flattenData))
            .map((child: FormGroupChild) => child.key)
            .forEach((key: string) => {
                Object.assign(formValue, formValue[key]);
                delete formValue[key];
            });
        this.formSubmit.emit({
            formData: formValue,
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
}
