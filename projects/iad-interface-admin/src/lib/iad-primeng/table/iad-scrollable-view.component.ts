import { Component, ElementRef, Input, NgZone, AfterViewInit, OnDestroy } from '@angular/core';

import { IadTableComponent } from './iad-table.component';

import {ScrollableView} from 'primeng/table';
import { Column } from 'primeng/shared';

@Component({
    selector: '[iadScrollableView]',
    templateUrl: './iad-scrollable-view.component.html',
    providers: [{ provide: ScrollableView, useExisting: IadScrollableViewComponent }]
})
export class IadScrollableViewComponent extends ScrollableView implements AfterViewInit, OnDestroy {

    @Input('iadScrollableView') columns: Column[];

    constructor(public dt: IadTableComponent, public el: ElementRef, public zone: NgZone) {
        super(dt, el, zone);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
