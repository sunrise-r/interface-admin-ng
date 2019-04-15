import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { filePath } from 'app/shared';
import { ProfileCardModel } from './profile-card.model';

@Component({
    selector: 'jhi-profile-card',
    templateUrl: './profile-card.component.html'
})
export class ProfileCardComponent implements OnChanges {
    @Input() fields: any;
    @Input() data: any;
    @Input() imageUrl: any;

    profileCardFields: ProfileCardModel[];

    image: any;

    constructor(private datePipe: DatePipe) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('data' in changes && this.fields) {
            this.profileCardFields = this.profileCardData(this.fields);
        }
        if ('imageUrl' in changes) {
            this.image = this.imageUrl ? filePath(this.imageUrl) : null;
        }
    }

    /**
     * Данные для карточки профиля
     */
    profileCardData(fields): ProfileCardModel[] {
        return fields.map(
            field =>
                new ProfileCardModel(
                    field.field,
                    field.header,
                    this.format(field.field, field.displayFormat),
                    false,
                    field.displayFormat === 'TranslateColumn'
                )
        );
    }

    private format(field: string, format: string): string {
        if (!this.data || !this.data[field]) {
            return '';
        }
        let result;
        switch (format) {
            case 'ZonedDateTime':
                result = this.datePipe.transform(this.data[field], 'mediumDate');
                break;
            default:
                result = this.data[field];
        }
        return result;
    }
}
