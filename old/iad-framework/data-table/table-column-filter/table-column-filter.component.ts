import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Subject, Subscription } from 'rxjs';

import { TableColumnFilter } from './table-column-filter.model';
import { FILTER_TYPE } from '../data-table/data-table.model';

@Component({
    selector: 'jhi-table-column-filter',
    template: `<input type="text" class="ui-grid-filter-input ui-grid-filter-input-0"
                      [(ngModel)]="term"
                      (input)="onFilter()"
                      [maxlength]="maxLength">
    <div role="button" class="ui-grid-filter-button"
         (click)="onRemoveFilter()"
         [hidden]="!term || term === ''">
        <i class="ui-grid-icon-cancel">&nbsp;</i>
    </div>`
})
export class TableColumnFilterComponent implements OnChanges {
    @Input() field: string;

    /**
     * Входящее событие сброса фильтра
     */
    @Input() resetFilter: Subject<FILTER_TYPE>;

    /**
     * Работа фильтра
     */
    @Output() filter = new EventEmitter<TableColumnFilter>();

    term: string;
    maxLength: 1000;

    private subscription: Subscription;

    ngOnChanges(changes: SimpleChanges): void {
        if ('resetFilter' in changes && this.resetFilter) {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.subscription = this.resetFilter.subscribe((type: FILTER_TYPE) => {
                if (type === FILTER_TYPE.BOTH || type === FILTER_TYPE.PARTICULAR) {
                    this.term = null;
                }
            });
        }
    }

    /**
     * Фильтр по колонке
     */
    onFilter() {
        this.filter.next(<TableColumnFilter>{ value: this.term, field: this.field });
    }

    /**
     * Сброс фильтра по колонке
     */
    onRemoveFilter() {
        this.term = null;
        this.onFilter();
    }
}
