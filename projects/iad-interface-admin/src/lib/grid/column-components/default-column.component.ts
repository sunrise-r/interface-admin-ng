import { Component, OnInit, Renderer2, ElementRef, Pipe, PipeTransform } from '@angular/core';

import { TableTdContentInterface } from './column-components.model';
import { IadGridColumn } from '../model/iad-grid-column.model';

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

@Component({
    selector: 'iad-default-column',
    template: `
        <ng-container [ngSwitch]="col.displayFormat">
            <span *ngSwitchCase="'ZonedDateTime'">{{rowData[col.field] | moment | date:'medium'}}</span>
            <span *ngSwitchCase="'TranslatePath'">{{rowData[col.field] | translate }}</span>
            <span *ngSwitchCase="'html'" [innerHTML]="rowData[col.field]"></span>
            <span *ngSwitchCase="'TranslateColumn'">
          {{['partnerGatewayApp.partnerDocuments', col.field, rowData[col.field]].join('.') | translate }}
        </span>
            <a *ngSwitchCase="'Link'" [href]="col.properties['url'] + rowData[col.properties['idKey']]">
                {{rowData[col.field]}}
            </a>
            <a *ngSwitchCase="'TranslatedLink'" [href]="col.properties['url'] + rowData[col.properties['idKey']]">
                {{rowData[col.field] | translate }}
            </a>
            <span *ngSwitchCase="'Boolean'">{{rowData[col.field] | boolean }}</span>
            <span *ngSwitchCase="'Status'">{{rowData[col.field] | status}}</span>
            <span *ngSwitchDefault>{{rowData[col.field]}}</span>
        </ng-container>`
})
export class DefaultColumnComponent implements OnInit, TableTdContentInterface {
    col: IadGridColumn;
    rowData: any;
    selected: any;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
        this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    }
}
