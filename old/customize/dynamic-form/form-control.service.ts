import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { FormInput } from './inputs/form-input.model';
import { DynamicFormHelper } from './dynamic-form.helper';
import { FormGroupChild, FormGroupChildColumn, FormInputGroup } from './form-input-group';

@Injectable()
export class FormControlService {
    constructor() {}

    toFormGroup(inputGroup: FormInputGroup): FormGroup {
        const group: { [param: string]: FormControl | FormGroup } = {};
        if (inputGroup.children) {
            inputGroup.children.forEach((childColumn: FormGroupChildColumn) =>
                childColumn.forEach((child: FormGroupChild) => {
                    if (DynamicFormHelper.isFormInputGroup(child)) {
                        group[child.key] = this.toFormGroup(<FormInputGroup>child);
                    } else {
                        const params = {
                            value: DynamicFormHelper.formatInputValue(<FormInput<any>>child) || null,
                            disabled: (<FormInput<any>>child).disabled
                        };
                        group[DynamicFormHelper.formatInputName(<FormInput<any>>child)] = new FormControl(
                            params,
                            this.getValidators((<FormInput<any>>child).validators)
                        );
                    }
                })
            );
        }
        return new FormGroup(group);
    }

    /**
     * Возвращает набор валидаторов для инпута формы
     * @param validators
     */
    getValidators(validators: {}): ValidatorFn[] | ValidationErrors {
        return Object.keys(validators).map((name: string) => {
            switch (name) {
                case 'min':
                case 'max':
                case 'minLength':
                case 'maxLength':
                    return Validators[name](validators[name]);
                case 'required':
                case 'email':
                    return validators[name] ? Validators[name] : Validators.nullValidator;
            }
        });
    }

    /**
     * Пересчитывает состояние зависимых полей. Также очищает те поля,
     * которые потеряли объект, от которого зависели.
     *
     * Проверки на enabled и disabled нужны, чтобы не возникала бесконечная рекурсия
     *
     * @author krovyaka
     */
    public recalculateDependencies(formInputGroup: FormInputGroup, context: any, form: FormGroup) {
        formInputGroup.children.forEach(formInputs =>
            formInputs.forEach(formInput => {
                if (formInput.dependencies) {
                    formInput.dependencies.forEach(dependency => {
                        if (!(dependency in context) || !context[dependency]) {
                            const depended = form.controls[formInput.key + 'Id'];
                            if (depended.enabled) depended.disable();
                        } else {
                            const independent = form.controls[formInput.key + 'Id'];
                            if (independent.disabled) independent.enable();
                        }
                    });
                }
            })
        );
    }
}
