import { ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject, Subscription } from 'rxjs';

import { DynamicFormHelper } from '../dynamic-form.helper';
import { ClassStyledInput } from './class-styled-input';

export class ValidationInput extends ClassStyledInput implements OnInit {
    config: any;
    group: FormGroup;
    error: string;
    touched: Subject<any> = new Subject<any>();

    get isInvalid(): boolean {
        const control = this.getFormControl();
        return control.invalid && (control.dirty || control.touched);
    }

    get labelColumnSize(): number {
        return this.config.column && this.config.column > 0 ? 4 : 2;
    }

    get formControlColumnSize(): number {
        return this.config.column && this.config.column > 0 ? 8 : 10;
    }

    constructor(private translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
        super(el, renderer);
    }

    ngOnInit(): void {
        this.subscribeFormControlChanges();
    }

    onBlur(): void {
        const control = this.getFormControl();
        this.addInputErrors(control, control.status);
        this.touched.next(this.config);
    }

    subscribeFormControlChanges() {
        const control = this.getFormControl();
        control.statusChanges.subscribe(status => this.addInputErrors(control, status));
    }

    addInputErrors(control: FormControl, status: string) {
        if (status === 'INVALID') {
            const controlErrors: ValidationErrors = control.errors;
            let errorLabels = [];
            if (controlErrors != null) {
                errorLabels = Object.keys(controlErrors).map(keyError => {
                    return 'entity.validation.' + keyError;
                });
            }
            this.translateService
                .get(errorLabels)
                .toPromise()
                .then(labels => {
                    let errorsText = '';
                    Object.keys(labels).forEach((labelKey: string) => {
                        if (errorsText.length > 0) {
                            errorsText += '\n';
                        }
                        errorsText += labels[labelKey];
                    });
                    this.error = errorsText;
                });
        } else if (status === 'VALID') {
            this.error = undefined;
        }
    }

    /**
     * Возвращает текущий контрол формы
     */
    private getFormControl(): FormControl {
        const controlName = DynamicFormHelper.formatInputName(this.config);
        return <FormControl>this.group.controls[controlName];
    }
}
