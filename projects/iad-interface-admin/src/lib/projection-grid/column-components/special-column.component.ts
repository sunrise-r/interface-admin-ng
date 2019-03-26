import { Component, OnInit } from '@angular/core';
// import { documentStatusesMap } from '../../model/russian-to-english.constants';
import { TranslateService } from '@ngx-translate/core';
import {TableTdContentInterface} from './column-components.model';
import {IadGridColumn} from '../model/iad-grid-column.model';

@Component({
    selector: 'iad-special-column',
    template: `<div *ngIf="display" class="icon {{iconClass}}" [title]="tooltip"></div>`
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

    constructor(private translationService: TranslateService) {}

    ngOnInit() {
      // @todo we need to replace this compnent somwhere outside IAD framework!!!
        // if (this.col.displayFormat === 'status') {
        //     console.log(this.rowData);
        //     this.iconClass = 'status-' + documentStatusesMap[this.rowData[this.col.field]];
        // } else {
            this.iconClass = this.col.displayFormat;
        // }
        this.initTooltip().then(translation => (this.tooltip = translation));
    }

    initTooltip(): Promise<string> {
        if (this.col.displayFormat === 'operation' || this.col.displayFormat === 'status') {
            return Promise.resolve(this.rowData[this.col.displayFormat]);
        }
        return this.translationService.get('additionalFields.' + this.col.field).toPromise();
    }
}
