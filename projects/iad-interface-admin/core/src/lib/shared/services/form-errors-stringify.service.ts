import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class FormErrorsStringifyService {
    errors: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private translateService: TranslateService) {}

    addFormErrors(form: FormGroup, inputLabels: any, translationPrefix = 'entity.validation.') {
        const status = form.status;
        if (status === 'INVALID') {
            const errors = this.collectInputErrors(form, translationPrefix);
            const translateLabels = this.formInputErrorsArray(errors);
            if (translateLabels.length > 0) {
                this.translateService
                    .get(translateLabels)
                    .toPromise()
                    .then(labels => {
                        this.errors.next(this.getFormErrorsText(errors, labels, inputLabels));
                    });
            } else {
                this.errors.next(undefined);
            }
        } else if (status === 'VALID') {
            this.errors.next(undefined);
        }
    }

    /**
     * Собирает все ошибки формы в виде текста
     * @param errors
     * @param translations
     * @param inputLabels
     */
    private getFormErrorsText(errors: any, translations: any, inputLabels: any) {
        let formErrorsText = '';
        Object.keys(errors).forEach((inputKey: string) => {
            let inputErrorsText = '';
            errors[inputKey].forEach((label: string) => {
                if (inputErrorsText.length > 0) {
                    inputErrorsText += '; ';
                }
                inputErrorsText += translations[label];
            });

            if (formErrorsText.length > 0) {
                formErrorsText += '\n';
            }

            formErrorsText += inputLabels[inputKey] + ': ' + inputErrorsText;
        });
        return formErrorsText;
    }

    /**
     * Собирает лейблы для ошибок по всем полям формы
     * Сгруппированные по полю
     * @param form
     * @param translationPrefix
     */
    private collectInputErrors(form: FormGroup, translationPrefix: string) {
        const errors = {};
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            const controlErrors: ValidationErrors = control.errors;
            if (controlErrors != null && (control.dirty || control.touched)) {
                errors[key] = [];
                Object.keys(controlErrors).forEach(keyError => {
                    errors[key].push(translationPrefix + keyError);
                });
            } else if (control['controls']) {
                Object.assign(errors, this.collectInputErrors(<FormGroup>control, translationPrefix));
            }
        });
        return errors;
    }

    /**
     * Собирает лейблы ошибок для переводов в Одномерном массиве
     * @param errors
     */
    private formInputErrorsArray(errors: any) {
        let translateLabels = [];
        Object.keys(errors).forEach((inputKey: string) => {
            translateLabels = translateLabels.concat(errors[inputKey]);
        });
        return translateLabels;
    }
}
