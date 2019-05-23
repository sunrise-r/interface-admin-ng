import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
    selector: 'iad-table-sort-icon',
    template: `
        <i [ngClass]="{ 'ui-grid-icon-up-dir': sortOrder === 1, 'ui-grid-icon-down-dir': sortOrder === -1, 'ui-grid-icon-blank': sortOrder === 0 }" aria-hidden="true"></i>
    `
})
export class TableSortIconComponent implements OnInit, OnDestroy {
    @Input() field: string;

    subscription: Subscription;

    sortOrder: number;

    constructor(public dt: Table) {
        this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
        });
    }

    ngOnInit() {
        this.updateSortState();
    }

    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        } else if (this.dt.sortMode === 'multiple') {
            const sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
