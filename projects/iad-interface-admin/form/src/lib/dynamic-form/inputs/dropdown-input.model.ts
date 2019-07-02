import { FormInput } from '../core/form-input.model';

export class DropdownInputModel extends FormInput<string> {
    controlType = 'dropdown';

    values: string[];
    translatePrefix: string;
    valuesUrl: string;
    showClear: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.values = options['values'];
        this.translatePrefix = options['translatePrefix'];
        this.valuesUrl = options['valuesUrl'];
        this.value = options['value'];
        this.showClear = options['showClear'];
    }
}
