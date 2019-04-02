import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

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
}
