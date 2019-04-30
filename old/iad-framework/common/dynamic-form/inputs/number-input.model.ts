import { FormInput } from '../core/form-input.model';

export class NumberInput extends FormInput<string> {
    controlType = 'number';
    validators: {
        min?: string;
        max?: string;
        required?: boolean;
    };
    type: string;
    step: number;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.step = options['step'] || 1;
    }
}
