import { Pipe, PipeTransform } from '@angular/core';
import { DynamicFormHelper } from './dynamic-form.helper';

@Pipe({
    name: 'formatInputName'
})
export class FormatInputNamePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return DynamicFormHelper.formatInputName(value);
    }
}
