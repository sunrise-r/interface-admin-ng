import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return value !== null ? moment(value) : null;
    }
}
