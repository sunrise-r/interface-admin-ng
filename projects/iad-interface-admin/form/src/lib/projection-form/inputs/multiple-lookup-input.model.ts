import {FormatValueInterface, FormInput} from '../../dynamic-form/core/form-input.model';

export class MultipleLookupInputModel extends FormInput<any> implements FormatValueInterface {
    presentationCode: string;
    lookupSourceProjectionCode: string;
    lookupViewProjectionCode: string;
    items: any[];
    sourceItems: any[];
    controlType = 'lookup';
    multiple = true;
    validators: {
        required?: boolean;
    };
    valueField: string;
    showFilter: boolean;

    /**
     * Флаг для отключения dropdown
     */
    disableDropdown: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.presentationCode = options['presentationCode'] || null;
        this.lookupSourceProjectionCode = options['lookupSourceProjectionCode'] || null;
        this.lookupViewProjectionCode = options['lookupViewProjectionCode'] || null;
        if (options['disableDropdown']) {
            this.disableDropdown = parseInt(options['disableDropdown'], 10) === 1;
        } else {
            this.disableDropdown = false;
        }
        this.sourceItems = options['sourceItems'] || [];
        this.valueField = options['valueField'] ? options['valueField'] : 'id';
        this.showFilter = options['showFilter'];
    }

    formatValue() {
        if (!this.value) {
            this.items = [];
            return;
        }
        this.items = [...this.value];
        return this.value.map(item => item[this.valueField]);
    }
}
