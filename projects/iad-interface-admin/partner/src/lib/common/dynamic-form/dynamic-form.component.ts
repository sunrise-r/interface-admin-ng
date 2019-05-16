import {
    AfterContentInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { FormControlService } from './form-control.service';
import { FormGroupChild, FormGroupChildColumn, FormInputGroup } from './core/form-input-group';
import { PrimeTemplate } from 'primeng/shared';
import {FormErrorsStringifyService} from '../../shared/services/form-errors-stringify.service';
import {FormHelperService} from '../../shared/util/form-helper.service';

@Component({
    selector: 'iad-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers: [FormControlService, FormErrorsStringifyService]
})
export class DynamicFormComponent implements OnInit, OnChanges, AfterContentInit {
    /**
     * Инпуты формы (заполняются извне компонента)
     */
    @Input() formInputGroup: FormInputGroup;

    /**
     * Ошибка сервера для вывода её в форме
     */
    @Input() serverError: HttpErrorResponse;

    /**
     * Контекст построения формы.
     */
    @Input() context: any;

    /**
     * Customized form Footer template
     */
    @Input() formTemplates: QueryList<PrimeTemplate>;

    /**
     * Компоненты инпутов формы
     * В виде объекта
     * {
     *     [inputKey: string]: any
     * }
     */
    @Input() inputComponents: { [param: string]: any } = {};

    /**
     * событие сабмита формы
     * Angular неявно создаёт событие submit, которое можно использовать тоже, но тогда мы теряем контроль над событиями
     */
    @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Событие отмены
     */
    @Output() formCancel: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Форма
     */
    form: FormGroup;

    /**
     * Footer template
     */
    formFooter: TemplateRef<any>;

    /**
     * Состояние отправки
     */
    sending: boolean;

    /**
     * Список ошибок формы
     */
    errors: string;

    constructor(
        private fcs: FormControlService,
        private formErrorsStringify: FormErrorsStringifyService,
        private formHelper: FormHelperService
    ) {}

    ngOnInit() {
        if (this.formInputGroup) {
            this.form = this.fcs.toFormGroup(this.formInputGroup);
            this.form.valueChanges.subscribe(() => {
                if (this.context === undefined) {
                    this.context = {};
                }
                Object.keys(this.form.value).forEach(k => (this.context[k] = this.form.value[k]));
                this.fcs.recalculateDependencies(this.formInputGroup, this.context, this.form);
                this.addFormErrors();
            });
        }
        this.formErrorsStringify.errors.subscribe(errors => {
            this.errors = errors;
        });
        this.fcs.recalculateDependencies(this.formInputGroup, {}, this.form);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('serverError' in changes && this.serverError) {
            this.formHelper.prepareServerError(this.serverError).then(message => {
                this.errors = message;
            });
            this.sending = false;
        }
    }

    ngAfterContentInit(): void {
        this.formTemplates.forEach(item => {
            switch (item.getType()) {
                case 'footer':
                    this.formFooter = item.template;
                    break;
            }
        });
    }

    addFormErrors() {
        this.formErrorsStringify.addFormErrors(this.form, this.getInputLabels());
    }

    onSubmit() {
        this.sending = true;
        this.formSubmit.next(this.form.value);
    }

    onTouched(field) {
        this.addFormErrors();
    }

    cancel() {
        this.formCancel.next(true);
    }

    /**
     * Определяет размер текущей колонки по количеству колонок
     * @param child
     */
    calculateColumns(child) {
        return Math.ceil(12 / child.length);
    }

    /**
     * Получаем названия всех инпутов
     */
    private getInputLabels() {
        const inputLabels = {};
        this.formInputGroup.children.forEach((inputColumn: FormGroupChildColumn) =>
            inputColumn.forEach((input: FormGroupChild) => {
                if ((<FormInputGroup>input).children) {
                    (<FormInputGroup>input).children.forEach((_inputColumn: FormGroupChildColumn) =>
                        _inputColumn.forEach((_input: FormGroupChild) => (inputLabels[_input.key] = _input.label))
                    );
                } else {
                    inputLabels[input.key] = input.label;
                }
            })
        );
        return inputLabels;
    }
}