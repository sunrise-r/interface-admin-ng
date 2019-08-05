import {
    Component,
    ElementRef,
    Injectable,
    NgZone,
    OnInit,
    OnDestroy,
    AfterViewInit,
    AfterContentInit, Input, OnChanges, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { Table, TableService } from 'primeng/table';
import { BlockableUI } from 'primeng/api';
import { LazyLoadData, ResizeEvent } from './iad-table-models';
import { ReplaySubject, Subject } from 'rxjs';
import { PaginatorService } from '../paginator/paginator.service';
import { IadDomHandler } from '../dom/iad-dom-handler';
import { IadObjectUtils } from '../utils/iad-object-utils';

@Component({
    selector: 'iad-table',
    templateUrl: './iad-table.component.html',
    providers: [TableService, PaginatorService, {provide: Table, useExisting: IadTableComponent}]
})
@Injectable()
export class IadTableComponent extends Table implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, BlockableUI, OnChanges {

    /**
     * Возможность снятия выделения строки таблицы, устанавливается в datatable
     */
    @Input() allowUnSelectRow: boolean;

    /**
     * #1226, 1271 Subject to notify table about height change
     */
    @Input() changeTableHeight: Subject<boolean> = new Subject<boolean>();

    /**
     * Request to update table view
     */
    @Input() doRefresh: ReplaySubject<string>;

    /**
     * Enable Infinite Scroll
     */
    @Input() enableInfiniteScroll: boolean;

    /**
     * Flag to set custom perfect scroll instead of regular browser scroll
     */
    @Input() enablePerfectScroll: boolean;

    /**
     * Колонки, которые можно закрепить справа
     */
    @Input() frozenRightColumns: any[];

    /**
     * Ширина закрепляемой справа области
     */
    @Input() frozenRightWidth: string;

    /**
     * Не сортировать при инициализации полей
     */
    @Input() noSortOnInit: boolean;

    /**
     * Входящее событие изменения размеров колонок
     */
    @Input() resize: Subject<ResizeEvent> = new Subject<ResizeEvent>();

    /**
     * Колонки, всегда закреплённые слева
     */
    @Input() staticFrozenColumns: any[];

    /**
     * Ширина колонок, всегда закреплённых слева
     */
    @Input() staticFrozenWidth: string;

    /**
     * Колонки, всегда закреплённые справа
     */
    @Input() staticFrozenRightColumns: any[];

    /**
     * Ширина колонок, всегда закреплённых справа
     */
    @Input() staticFrozenRightWidth: string;

    /**
     * сабжект снятия выделения
     */
    @Input() unSelectRow: Subject<boolean> = new Subject<boolean>();

    /**
     *
     */
    @Output() page = new EventEmitter<any>();

    constructor(public el: ElementRef, public zone: NgZone, public tableService: TableService, public paginatorService: PaginatorService) {
        super(el, zone, tableService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.paginatorService
            .init(this.totalRecords, this.first, this.rows)
            .pageChange.subscribe((event: any) => this.onScrollPageChange(event));
        this.paginatorService.firstReset.subscribe((first: number) => (this.first = first));
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('totalRecords' in changes) {
            this.paginatorService.totalRecords = this.totalRecords;
        }
        if ('unSelectRow' in changes) {
            this.unSelectRow.subscribe(() => {
                this.onUnSelectItem();
            });
        }
    }

    ngOnDestroy() {
        this.paginatorService.resetAll();
        super.ngOnDestroy();
    }

    ngAfterContentInit() {
        super.ngAfterContentInit();
    }

    /**
     * Страница изменена при скролле
     * @param event
     */
    onScrollPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
        this.page.emit(this.createLazyLoadMetadata(false));
        this.tableService.onValueChange(this.value);
    }

    /**
     * Контент события для подгрузки данных onLazyLoad
     * @TODO MAy be move this code into grid-component and use its own table settings with ability to update from events
     * It is used in methods:
     * onPageChange, onSortSingle, onSortMultiple, _filter(), reset, handleVirtualScroll, OnInit;
     * when set property value and not lazy
     * when set sort field or sort order
     * @param clearData
     */
    createLazyLoadMetadata(clearData?: boolean): LazyLoadData {
        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta,
            clearData: clearData === undefined ? true : clearData
        };
    }

    handleRowClick(event) {
        const target = <HTMLElement>event.originalEvent.target;
        const targetNode = target.nodeName;
        const parentNode = target.parentElement.nodeName;
        let selectionIndex = null;
        if (
            targetNode === 'INPUT' ||
            targetNode === 'BUTTON' ||
            targetNode === 'A' ||
            parentNode === 'INPUT' ||
            parentNode === 'BUTTON' ||
            parentNode === 'A' ||
            IadDomHandler.hasClass(event.originalEvent.target, 'ui-clickable')
        ) {
            return;
        }

        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;

            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                IadDomHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }

                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            } else {
                const rowData = event.rowData;
                const selected = this.isSelected(rowData);
                const metaSelection = this.rowTouched ? false : this.metaKeySelection;
                const dataKeyValue = this.dataKey ? String(IadObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;

                if (metaSelection) {
                    const metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.allowUnSelectRow) {
                            if (this.isSingleSelectionMode()) {
                                this._selection = null;
                                this.selectionKeys = {};
                                this.selectionChange.emit(null);
                            } else {
                                selectionIndex = this.findIndexInSelection(rowData);
                                this._selection = this.selection.filter((val, i) => i !== selectionIndex);
                                this.selectionChange.emit(this.selection);
                                if (dataKeyValue) {
                                    delete this.selectionKeys[dataKeyValue];
                                }
                            }

                            this.onRowUnselect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                        }
                    } else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        } else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            } else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }

                            this._selection = [...this.selection, rowData];
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }

                        this.onRowSelect.emit({
                            originalEvent: event.originalEvent,
                            data: rowData,
                            type: 'row',
                            index: event.rowIndex
                        });
                    }
                } else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            if (this.allowUnSelectRow) {
                                this._selection = null;
                                this.selectionKeys = {};
                                this.selectionChange.emit(this.selection);
                                this.onRowUnselect.emit({
                                    originalEvent: event.originalEvent,
                                    data: rowData,
                                    type: 'row'
                                });
                            }
                        } else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({
                                originalEvent: event.originalEvent,
                                data: rowData,
                                type: 'row',
                                index: event.rowIndex
                            });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    } else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i !== selectionIndex);
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({originalEvent: event.originalEvent, data: rowData, type: 'row'});
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        } else {
                            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({
                                originalEvent: event.originalEvent,
                                data: rowData,
                                type: 'row',
                                index: event.rowIndex
                            });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }

            this.tableService.onSelectionChange();
        }

        this.rowTouched = false;
    }

    onColumnDrop(event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            const dragIndex = IadDomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            const dropIndex = IadDomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            const tableContainer = IadDomHandler.findParentByClassName(this.draggedColumn, 'ui-table-scrollable-view');
            const columns = tableContainer.classList.contains('frozen-left')
                ? this.frozenColumns
                : tableContainer.classList.contains('frozen-right') ? this.frozenRightColumns : this.columns;
            let allowDrop = dragIndex !== dropIndex;
            if (
                allowDrop &&
                ((dropIndex - dragIndex === 1 && this.dropPosition === -1) || (dragIndex - dropIndex === 1 && this.dropPosition === 1))
            ) {
                allowDrop = false;
            }

            if (allowDrop) {
                IadObjectUtils.reorderArray(columns, dragIndex, dropIndex);

                this.onColReorder.emit({
                    dragIndex,
                    dropIndex,
                    columns
                });
            }

            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }

    onColumnResizeEnd(event, column) {
        let delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        const columnWidth = column.offsetWidth;
        const minWidth = parseInt(column.style.minWidth || '15', 10);

        if (columnWidth + delta < minWidth) {
            delta = minWidth - columnWidth;
        }

        const newColumnWidth = columnWidth + delta;

        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }

                if (nextColumn) {
                    const nextColumnWidth = nextColumn.offsetWidth - delta;
                    const nextColumnMinWidth = nextColumn.style.minWidth || 15;

                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth, 10)) {
                        if (this.scrollable) {
                            const scrollableView = this.findParentScrollableView(column);
                            const scrollableBodyTable = IadDomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                            const scrollableHeaderTable = IadDomHandler.findSingle(
                                scrollableView,
                                'table.ui-table-scrollable-header-table'
                            );
                            const scrollableFooterTable = IadDomHandler.findSingle(
                                scrollableView,
                                'table.ui-table-scrollable-footer-table'
                            );
                            const resizeColumnIndex = IadDomHandler.index(column);

                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        } else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            } else if (this.columnResizeMode === 'expand') {
                if (this.scrollable) {
                    const scrollableView = this.findParentScrollableView(column);
                    const scrollableBodyTable = IadDomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                    const scrollableHeaderTable = IadDomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
                    const scrollableFooterTable = IadDomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');

                    // #1226 We don't need to set fixed width if it was not set in settings. Otherwise we'll meet troubles changing page width
                    if (scrollableBodyTable.style.width && scrollableBodyTable.style.width.toString().lenght > 0) {
                        scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                        scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                        if (scrollableFooterTable) {
                            scrollableFooterTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                        }
                    }

                    const resizeColumnIndex = IadDomHandler.index(column);

                    this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                } else {
                    this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    const containerWidth = this.tableViewChild.nativeElement.style.width;
                    this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                }
            }

            this.onColResize.emit({
                element: column,
                delta
            });
        }

        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        IadDomHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    }

    /**
     * Снимает выделение с таблицы
     */
    private onUnSelectItem() {
        this._selection = null;
        this.selectionKeys = {};
        this.selectionChange.emit(null);
        this.tableService.onSelectionChange();
    }
}
