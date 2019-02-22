import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { TableColumnFilter } from './table-column-filter.model';

@Component({
    selector: 'iad-table-column-filter',
    templateUrl: './table-column-filter.component.html',
    styles: []
})
export class TableColumnFilterComponent implements AfterViewInit {
    @Input() field: string;
    /**
     * Входящее событие сброса фильтра
     */
    @Input() resetFilter: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    /**
     * Работа фильтра
     */
    @Output() filter = new EventEmitter<TableColumnFilter>();

    term: string;
    maxLength: 1000;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        this.resetFilter.subscribe(() => (this.term = null));
        this.renderer.addClass(this.el.nativeElement, 'ui-grid-filter-container');
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
