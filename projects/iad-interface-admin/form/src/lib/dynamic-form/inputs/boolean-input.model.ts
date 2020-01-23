import {FormInput} from '../core/form-input.model';

export class BooleanInput extends FormInput<boolean> {
    controlType = 'boolean';

    constructor(options: {} = {}) {
        super(options);
        this.value = this.value === true;
    }

    protected preprocessValue(value: any): boolean {
        return value === 'true' || value === true;
    }
}
