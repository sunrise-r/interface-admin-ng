import { FormInput } from './form-input.model';

export class HiddenInput extends FormInput<string> {
    controlType = 'hidden';
    validators: {
        required?: boolean;
    };
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || 'hidden';
    }
}
