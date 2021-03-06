import { FormInput } from '../core/form-input.model';

export class FileInput extends FormInput<string> {
    controlType = 'file';
    validators: {
        required?: boolean;
    };

    constructor(options: {} = {}) {
        super(options);
    }
}
