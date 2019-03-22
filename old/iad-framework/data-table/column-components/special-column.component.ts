import { Component, OnInit } from '@angular/core';
import { DataTableColumn, TableTdContentInterface } from '../data-table/data-table.model';
import { documentStatusesMap } from '../../model/russian-to-english.constants';

@Component({
    selector: 'iad-special-column',
    template: `<div *ngIf="display" class="icon {{iconClass}}"></div>`
})
export class SpecialColumnComponent implements OnInit, TableTdContentInterface {
    col: DataTableColumn;
    rowData: any;
    selected: boolean;
    iconClass: string;

    get display(): boolean {
        return this.rowData[this.col.field] !== undefined ? this.rowData[this.col.field] : false;
    }

    constructor() {}

    ngOnInit() {
        if (this.col.displayFormat === 'status') {
            this.iconClass = 'status-' + documentStatusesMap[this.rowData[this.col.field]];
        } else {
            this.iconClass = this.col.displayFormat;
        }
    }
}
