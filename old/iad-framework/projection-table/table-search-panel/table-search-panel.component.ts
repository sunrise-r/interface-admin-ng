import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { FILTER_TYPE } from '../../data-table/data-table/data-table.model';

// [jhiFocus]="tableSearchDropdown.openChange"
@Component({
    selector: 'iad-table-search-panel',
    template: `<input type="text"
                      [(ngModel)]="searchQuery"
                      (ngModelChange)="emitSearchEvent($event)"
                      class="ui-grid-filter-input ui-grid-filter-input-0"
                      placeholder="{{'partnerTable.toolbar.searchPlaceholder' | translate}}">`
})
export class TableSearchPanelComponent implements OnChanges {
    /**
     * Входящее событие сброса фильтра
     */
    @Input() resetFilter: Subject<FILTER_TYPE>;

    /**
     * Работа фильтра
     */
    @Output() search = new EventEmitter<string>();

    searchQuery: string;

    private subscription: Subscription;

    ngOnChanges(changes: SimpleChanges): void {
        if ('resetFilter' in changes && this.resetFilter) {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.subscription = this.resetFilter.subscribe((type: FILTER_TYPE) => {
                if (type === FILTER_TYPE.BOTH || type === FILTER_TYPE.GLOBAL) {
                    this.searchQuery = null;
                }
            });
        }
    }

    emitSearchEvent(value) {
        this.search.emit(value);
    }
}
