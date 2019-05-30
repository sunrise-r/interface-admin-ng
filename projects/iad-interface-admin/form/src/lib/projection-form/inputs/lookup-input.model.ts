import {FormatNameInterface, FormatValueInterface, FormInput} from '../../dynamic-form/core/form-input.model';

export class LookupInputModel extends FormInput<any> implements FormatNameInterface, FormatValueInterface {
    presentationCode: string;
    lookupSourceProjectionCode: string;
    lookupViewProjectionCode: string;
    items: any[];
    sourceItems: any[];
    controlType = 'lookup';
    multiple = false;
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
        this.disableDropdown = options['disableDropdown'] ? parseInt(options['disableDropdown'], 10) === 1 : false;
        this.sourceItems = options['sourceItems'] || [];
        this.valueField = options['valueField'] ? options['valueField'] : 'id';
        this.showFilter = options['showFilter'];
    }

    // @todo Считаю необходимым изменить в PartnerCMS для всех полей Lookup (List) поле key на key + Id, стоит учесть, что также необходимо везде указать presentationCode;
    // @todo Нежелательно использовать модификаоры имени поля
    formatName() {
        return this.valueField !== 'id' ? this.valueField : this.key + 'Id';
    }

    formatValue() {
        if (!this.value) {
            this.items = [];
            return;
        }
        this.items = [this.value];
        return this.value.id;
    }
}
