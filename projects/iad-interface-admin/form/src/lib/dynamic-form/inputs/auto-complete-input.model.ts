import { FormInput } from '../core/form-input.model';

export class AutoCompleteInput extends FormInput<string> {
    controlType = 'autoComplete';
    validators: {
        minLength?: string;
        maxLength?: string;
        required?: boolean;
        email?: boolean;
    };
    type: string;
    valuesUrl: string;
    multiple: boolean;

    constructor(options: {} = {}) {
        super(options);
        if (this.validators.email) {
            options['type'] = 'email';
        }
        this.type = options['type'] || '';
        this.valuesUrl = options['valuesUrl'];
        this.multiple = options['multiple'] || false;
    }
}
