import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        switch (value) {
            case 'NEW': {
                return 'Новый';
            }
            case 'ACCEPTED': {
                return 'Действующий';
            }
            case 'REJECTED': {
                return 'Аннулированный';
            }
            case 'REVIEW': {
                return 'На согласовании';
            }
        }
        return value;
    }
}
