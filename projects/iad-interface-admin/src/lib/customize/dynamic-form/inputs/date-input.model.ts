import { FormatValueInterface, FormInput } from './form-input.model';
import * as momentImported from 'moment'; const moment = momentImported;

const NOW = 'NOW';

export class DateInput extends FormInput<string> implements FormatValueInterface {
    controlType = 'date';
    validators: {
        required?: boolean;
    };
    constructor(options: {} = {}) {
        super(options);
    }

    formatValue(): any {
        if (this.value === NOW) {
            return new Date();
        }
        if (this.value) {
            return moment(this.value).toDate();
        }
        return this.value;
    }
}
