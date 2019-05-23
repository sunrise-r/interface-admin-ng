import { Pipe, PipeTransform } from '@angular/core';
import * as momentImported from 'moment'; const moment = momentImported;

@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return value !== null ? moment(value) : null;
    }
}
