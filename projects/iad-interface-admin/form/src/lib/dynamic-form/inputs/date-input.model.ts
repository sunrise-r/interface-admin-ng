import * as momentImported from 'moment'; const moment = momentImported;
import { FormatValueInterface, FormInput } from '../core/form-input.model';

const NOW = 'NOW';

export class DateInput extends FormInput<string> implements FormatValueInterface {
    controlType = 'date';
    validators: {
        required?: boolean;
    };
    dateFormat: string;
    constructor(options: {} = {}) {
        super(options);
        this.dateFormat = options['dateFormat'] || 'dd.mm.yy';
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
