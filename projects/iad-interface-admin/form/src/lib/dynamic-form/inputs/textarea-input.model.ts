import { FormInput } from '../core/form-input.model';

export class TextareaInput extends FormInput<string> {
    controlType = 'textarea';
    validators: {
        minLength?: string;
        maxLength?: string;
        required?: boolean;
    };

    constructor(options: {} = {}) {
        super(options);
    }
}
