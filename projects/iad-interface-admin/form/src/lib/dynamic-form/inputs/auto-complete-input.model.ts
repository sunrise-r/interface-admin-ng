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
    forceSelection: string; // will limit autocomplete values with only selectable values

    constructor(options: {} = {}) {
        super(options);
        if (this.validators.email) {
            options['type'] = 'email';
        }
        this.type = options['type'] || '';
        this.valuesUrl = options['valuesUrl'];
        this.multiple = options['multiple'] || false;
        this.forceSelection = options['forceSelection'] || false;
    }
}
