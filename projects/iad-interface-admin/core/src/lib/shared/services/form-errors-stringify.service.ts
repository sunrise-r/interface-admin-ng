import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

export class FormInputError {
    constructor(
        public inputName: string,
        public errorName: string,
        public interpolateParams: {[p: string]: string | number | Date}
    ) {}
}

@Injectable()
export class FormErrorsStringifyService {
    errors: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private translateService: TranslateService) {}

    addFormErrors(form: FormGroup, inputLabels: any, translationPrefix = 'entity.validation.') {
        const status = form.status;
        if (status === 'INVALID') {
            const errors = this.collectInputErrors(form, translationPrefix);
            const translateRequests = this.formInputErrorTranslationRequests(errors);
            if (translateRequests.length > 0) {
                forkJoin(translateRequests)
                    .pipe(
                        map(labels => labels.reduce((acu, labelObj) => Object.assign(acu, labelObj), {}))
                    )
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
    private getFormErrorsText(errors: FormInputError[], translations: {[p: string]: string}, inputLabels: any) {
        const errorsObj = errors.reduce((acu, error) => {
                if (!acu[error.inputName]) {
                    acu[error.inputName] = [];
                }
                acu[error.inputName].push(translations[error.errorName]);
                return acu;
            }, {});
        return Object.keys(errorsObj)
            .map(key => inputLabels[key]  + ': ' + errorsObj[key].join('; '))
            .join('\n');
    }

    /**
     * Собирает лейблы для ошибок по всем полям формы
     * Сгруппированные по полю
     * @param form
     * @param translationPrefix
     */
    private collectInputErrors(form: FormGroup, translationPrefix: string): FormInputError[] {
        let errors: FormInputError[] = [];
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            const controlErrors: ValidationErrors = control.errors;
            if (controlErrors != null && (control.dirty || control.touched || control.value)) {
                Object.keys(controlErrors).forEach(errorKey => {
                    errors.push(new FormInputError(key, translationPrefix + errorKey, controlErrors[errorKey]));
                });
            } else if (control['controls']) {
                errors = errors.concat(this.collectInputErrors(<FormGroup>control, translationPrefix));
            }
        });
        return errors;
    }

    /**
     * Собирает лейблы ошибок для переводов в Одномерном массиве
     * @param errors
     */
    private formInputErrorTranslationRequests(errors: FormInputError[]): Observable<string | any>[] {
        return errors.map((error: FormInputError) => (
            this.translateService.get([error.errorName], error.interpolateParams)
        ));
    }
}
