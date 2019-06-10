import { Component, HostListener } from '@angular/core';
import { AffectTableInterface, TableTdContentInterface } from './column-components.model';
import { Subject } from 'rxjs';
import { IadGridColumn } from '../model/iad-grid-column.model';

@Component({
    selector: 'iad-selection-indicator-column',
    template: `
        <div class="ui-select-button-icon ui-widget ui-state-default ui-clickable"
             [ngClass]="{'ui-state-active':selected, 'ui-state-disabled':disabled}">
        </div>`
})
export class SelectionIndicatorColumnComponent implements AffectTableInterface, TableTdContentInterface {
    col: IadGridColumn;
    selected: boolean;
    rowData: any;
    disabled: boolean;

    manageTable: Subject<{ code: string; value: any }> = new Subject<{ code: string; value: any }>();

    @HostListener('click')
    onClick() {
        this.manageTable.next({code: 'unselect', value: true});
    }
}
