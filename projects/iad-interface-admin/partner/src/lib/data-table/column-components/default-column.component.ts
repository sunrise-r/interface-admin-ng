import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

import { DataTableColumn, TableTdContentInterface } from '../data-table/data-table.model';

@Component({
    selector: 'iad-default-column',
    template: `<ng-container [ngSwitch]="col.displayFormat">
        <span *ngSwitchCase="'ZonedDateTime'">{{rowData[col.field] | moment | date:'medium'}}</span>
        <span *ngSwitchCase="'TranslatePath'">{{rowData[col.field] | translate }}</span>
        <span *ngSwitchCase="'TranslateColumn'">{{['partnerGatewayApp.partnerDocuments', col.field, rowData[col.field]].join('.') | translate }}</span>
        <span *ngSwitchCase="'Boolean'">{{rowData[col.field] | boolean }}</span>
        <span *ngSwitchCase="'Status'">{{rowData[col.field] | status}}</span>
        <span *ngSwitchDefault>{{rowData[col.field]}}</span>
    </ng-container>`
})
export class DefaultColumnComponent implements OnInit, TableTdContentInterface {
    col: DataTableColumn;
    rowData: any;
    selected: any;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
        this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    }
}
