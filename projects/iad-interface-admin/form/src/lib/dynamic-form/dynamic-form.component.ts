import {
    AfterContentInit, ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { PrimeTemplate } from 'primeng/shared';

import { FormControlService } from './form-control.service';
import { FormGroupChild, FormGroupChildColumn, FormInputGroup } from './core/form-input-group';
import { FormErrorsStringifyService, FormHelperService } from 'iad-interface-admin/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'iad-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers: [FormControlService, FormErrorsStringifyService]
})
export class DynamicFormComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
    /**
     * Инпуты формы (заполняются извне компонента)
     */
    @Input() formInputGroup: FormInputGroup;

    /**
     * Ошибка сервера для вывода её в форме
     */
    @Input() serverError: HttpErrorResponse;

    /**
     * Context data for current form input components.
     * It's used in forms containing dependent inputs, or in other situations when you need
     * some extra information for inputs in the form.
     * Notice! It should never be null or undefined, otherwise input components,
     * that will be created inside DynamicFieldDirective will never know about it's changes!
     */
    @Input()
    get context(): any {
        return this._context;
    };
    set context(context: any) {
        this._context = context || {};
    };

    /**
     * When form is nested than it has other parent form.
     * Set this parameter to disable <form></form> tag and form buttons for current fieldset
     */
    @Input() isNestedForm: boolean;

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
     * Form cancel event
     */
    @Output() formCancel: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Form values change outgoing event
     */
    @Output() valueChanges: EventEmitter<any> = new EventEmitter<any>();

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

    /**
     * Inner form input components context variable
     */
    private _context = {};

    private formValueChangesSbt: Subscription;

    constructor(
        private fcs: FormControlService,
        private formErrorsStringify: FormErrorsStringifyService,
        private formHelper: FormHelperService,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.formErrorsStringify.errors.subscribe(errors => this.setFormErrors(errors));
        this.fcs.recalculateDependencies(this.formInputGroup, this.context, this.form);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('serverError' in changes && this.serverError) {
            this.formHelper.prepareServerError(this.serverError).then(errors => this.setFormErrors(errors));
        }
        if ('formInputGroup' in changes) {
            this.form = this.fcs.toFormGroup(this.formInputGroup);
            this.subscribeFormChanges();
        }
    }

    ngAfterContentInit(): void {
        if (this.formTemplates) {
            this.formTemplates.forEach(item => {
                switch (item.getType()) {
                    case 'footer':
                        this.formFooter = item.template;
                        break;
                }
            });
        }
    }

    ngOnDestroy(): void {
        if (this.formValueChangesSbt && !this.formValueChangesSbt.closed) {
            this.formValueChangesSbt.unsubscribe();
        }
    }

    /**
     * Form value updator for external use only
     */
    updateForm() {
        this.fcs.updateFormGroup(this.form, this.formInputGroup);
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

    /**
     * Updates form context with current form values after current form change
     */
    private updateContext(context: {[p: string]: any}): void {
        Object.keys(context).forEach(k => (this.context[k] = context[k]));
    }

    /**
     * Sets form errors and detect changes
     * @param errors
     */
    private setFormErrors(errors) {
        this.errors = errors;
        this.sending = false;
        this.cdr.detectChanges();
    }

    /**
     * Re-subscribes to form changes
     */
    private subscribeFormChanges(): void {
        if (this.formValueChangesSbt && !this.formValueChangesSbt.closed) {
            this.formValueChangesSbt.unsubscribe();
        }
        this.formValueChangesSbt = this.form.valueChanges.subscribe(() => {
            this.updateContext(this.form.value);
            this.fcs.recalculateDependencies(this.formInputGroup, this.context, this.form);
            this.valueChanges.emit(this.form.value);
            this.addFormErrors();
        });
    }
}
