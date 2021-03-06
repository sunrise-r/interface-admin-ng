import * as momentImported from 'moment'; const moment = momentImported;
import { FormatValueInterface, FormInput } from '../core/form-input.model';

const NOW = 'NOW';

export class DateTimeInput extends FormInput<string> implements FormatValueInterface {
    controlType = 'datetime';
    validators: {
        required?: boolean;
    };
    dataType: string;
    dateFormat: string;

    constructor(options: {} = {}) {
        super(options);
        this.dataType = options['dataType'] || 'date';
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
