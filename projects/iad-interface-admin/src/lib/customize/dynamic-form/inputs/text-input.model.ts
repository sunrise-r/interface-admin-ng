import { FormInput } from './form-input.model';

export class TextInput extends FormInput<string> {
    controlType = 'textbox';
    validators: {
        minLength?: string;
        maxLength?: string;
        required?: boolean;
        email?: boolean;
    };
    type: string;
    inputMask: string;

    constructor(options: {} = {}) {
        super(options);
        if (this.validators.email) {
            options['type'] = 'email';
        }
        this.type = options['type'] || '';
        this.inputMask = options['inputMask'] || '';
    }
}
