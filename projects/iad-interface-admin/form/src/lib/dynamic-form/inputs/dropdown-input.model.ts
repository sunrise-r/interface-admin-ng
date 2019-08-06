import { FormInput } from '../core/form-input.model';

export class DropdownInputModel extends FormInput<string> {
    controlType = 'dropdown';

    values: string[];
    translatePrefix: string;
    valuesUrl: string;
    valueField: string;
    labelField: string;

    /**
     * Single only
     */
    showClear: boolean;

    /**
     * Single/multiple toggle
     */
    multiple: boolean;

    /**
     * Multiple only
     */
    maxSelectedLabels: number;

    /**
     * Multiple only
     */
    showHeader: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.values = options['values'];
        this.maxSelectedLabels = options['maxSelectedLabels'] || 3;
        this.showHeader = options['showHeader'] === undefined ? true : options['showHeader'];
        this.translatePrefix = options['translatePrefix'];
        this.valuesUrl = options['valuesUrl'];
        this.value = options['value'];
        this.showClear = options['showClear'];
        this.valueField = options['valueField'] || 'value';
        this.labelField = options['labelField'] || 'label';
        this.multiple = options['multiple'] || false;
    }
}
