import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableTdContentInterface } from './column-components.model';
import { IadGridColumn } from '../model/iad-grid-column.model';

export const documentStatusesMap = {
    Аннулирован: 'discard',
    Действующий: 'accepted',
    Действует: 'accepted',
    Новый: 'new',
    'На согласовании': 'review'
};

@Component({
    selector: 'iad-special-column',
    template: `
        <div *ngIf="display" class="icon {{iconClass}}" [title]="tooltip"></div>`
})
export class SpecialColumnComponent implements OnInit, TableTdContentInterface {
    col: IadGridColumn;
    rowData: any;
    selected: boolean;
    iconClass: string;

    tooltip: string;

    get display(): boolean {
        return this.rowData[this.col.field] !== undefined ? this.rowData[this.col.field] : false;
    }

    constructor(private translationService: TranslateService) {
    }

    ngOnInit() {
        if (this.col.displayFormat === 'status') {
            this.iconClass = 'status-' + documentStatusesMap[this.rowData[this.col.field]];
        } else {
            this.iconClass = this.col.displayFormat;
        }
        this.initTooltip().then(translation => (this.tooltip = translation));
    }

    initTooltip(): Promise<string> {
        if (this.col.displayFormat === 'operation' || this.col.displayFormat === 'status') {
            return Promise.resolve(this.rowData[this.col.displayFormat] || this.rowData[this.col.field]);
        }
        return this.translationService.get('additionalFields.' + this.col.field).toPromise();
    }
}
