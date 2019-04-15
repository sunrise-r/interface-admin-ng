import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { onColumnHide } from 'app/iad-framework/model/events.models';
import { IDataTableColumn } from 'app/iad-framework/data-table/data-table/data-table.model';

@Component({
    selector: 'iad-dropdown-column-selector',
    template: `<jhi-checkbox-list-component
        [items]="columns"
        statusField="visible"
        [disabled]="columnDisabled"
        labelField="header"
        (statusChange)="onToggleColumnVisibility($event)"
    ></jhi-checkbox-list-component>`
})
export class DropdownColumnSelectorComponent implements OnInit {
    /**
     * Колонки, которыми необходимо управлять
     */
    @Input() columns: IDataTableColumn[];

    /**
     * ключ настроек, идентификатор проекции/представления
     */
    @Input() groupSettingsKey: string;

    /**
     * Изменена видимость колонок
     */
    @Output() visibilityChanged: Subject<IDataTableColumn> = new Subject<IDataTableColumn>();

    /**
     * Число видимых колонок
     */
    visibleCount: number;

    subscription: Subscription;

    columnDisabled = column => this.visibleCount === 1 && column.visible;

    constructor(private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.subscription = this.eventManager.subscribe(onColumnHide + this.groupSettingsKey, event => {
            this.onToggleColumnVisibility(event.content);
        });
    }

    onToggleColumnVisibility(column: IDataTableColumn) {
        this.visibleCount = 0;
        this.columns.forEach(x => (x.visible ? this.visibleCount++ : null));
        this.visibilityChanged.next(column);
    }
}
