import {FormInput} from '../../common/dynamic-form/inputs/form-input.model';

export enum SEX {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export class GenderSelectionDropdownInput extends FormInput<string> {
    controlType = 'dropdown';
    sourceItems: { name: string; code: SEX }[];
    multiple = false;
    validators: {
        required?: boolean;
    };

    constructor(options: {} = {}) {
        super(options);
        this.sourceItems = options['sourceItems'] || [
            { name: 'partnerGatewayApp.partnerDocumentsEmployee.' + SEX.MALE, code: SEX.MALE },
            { name: 'partnerGatewayApp.partnerDocumentsEmployee.' + SEX.FEMALE, code: SEX.FEMALE }
        ];
    }
}
