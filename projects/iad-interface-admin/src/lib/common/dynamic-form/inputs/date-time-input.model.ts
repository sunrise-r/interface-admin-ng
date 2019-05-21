import { FormatValueInterface, FormInput } from './form-input.model';
import * as momentImported from 'moment'; const moment = momentImported;

const NOW = 'NOW';

export class DateTimeInput extends FormInput<string> implements FormatValueInterface {
    controlType = 'datetime';
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
