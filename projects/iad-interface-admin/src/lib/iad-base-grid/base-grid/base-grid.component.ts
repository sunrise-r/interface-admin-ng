import {
    AfterContentInit, AfterViewInit,
    Component,
    ContentChildren, ElementRef,
    EventEmitter, Inject,
    Input, OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { PrimeTemplate } from 'primeng/shared';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { FilterBuilderInterface, FILTER_BUILDER, CustomizeQuery } from 'iad-interface-admin/filter';

import { IadProjectionGridService } from '../services/iad-projection-grid.service';

import { LazyLoadData, ResizeEvent, IadTableComponent, IadConfigService } from 'iad-interface-admin/core';
import { FILTER_TYPE, IadGridConfigModel } from '../model/iad-grid-model';
import { IadGridColumn } from '../model/iad-grid-column.model';
import { columnComponents } from '../column-components/column-components.factory';
import { CmsSetting } from './cms-setting';

import { BaseGridColumnsService } from './base-grid-columns.service';
import { IadGridColumnFrozen, IadGridFrozenEvent, IadGridFrozenStructure } from './base-grid-freeze-column.model';

@Component({
    selector: 'iad-base-grid',
    templateUrl: './base-grid.component.html',
    providers: [BaseGridColumnsService]
})
export class BaseGridComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    /**
     * Flag to toggle possibility to remove row selection
     */
    @Input() allowUnSelectRow: boolean;

    /**
     * External notify table about height change
     */
    @Input() changeTableHeight: Subject<boolean> = new Subject<boolean>();

    /**
     * Columns
     */
    @Input() columns: IadGridColumn[];

    /**
     * Field to sort the table by default
     */
    @Input() defaultSortField = 'id';

    /**
     * Sending table config to BaseGridComponent
     */
    @Input() refreshGridConfig: Subject<IadGridConfigModel> = new Subject<IadGridConfigModel>();

    /**
     * External table action
     */
    @Input() doTableAction: Subject<{ code: string; value: any }>;

    /**
     * Unique ID to identify current table on the page
     */
    @Input() gridId: string;

    /**
     * Flag to set infinite scroll
     */
    @Input() enableInfiniteScroll: boolean;

    /**
     * Data to display in the table
     */
    @Input() value: any[] = [];

    /**
     * Flag to toggle Primeng table lazy loading
     */
    @Input() lazy: boolean;

    /**
     * Query builder. Allows to set additional query builder params
     */
    @Input() filter: CustomizeQuery;

    /**
     * String filter builder type.
     */
    @Input() filterType: string;

    /**
     * #4 Add paginator to the table
     */
    @Input() paginator: boolean;

    /**
     * Flag to set if table should request data on initialization;
     */
    @Input() refreshOnInit: boolean;

    /**
     * Internal reset filters subject
     */
    @Input() resetFilter: Subject<FILTER_TYPE> = new Subject<FILTER_TYPE>();

    /**
     * Grid data Source
     */
    @Input() searchUrl: string;

    /**
     * Flag to check if grid header filter should be shown
     */
    @Input() showFilter: boolean;

    /**
     * Sort field
     */
    @Input() sortField: string;

    /**
     * Sort order
     */
    @Input() sortOrder: number;

    /**
     * List of columns statically frozen lefts
     */
    @Input() staticFrozenColumns: IadGridColumn[] = [];

    /**
     * List of columns statically frozen rights
     */
    @Input() staticFrozenRightColumns: IadGridColumn[] = [];

    /**
     * Width of statically frozen rights columns area
     */
    @Input() staticFrozenRightWidth = '0';

    /**
     * Width of statically frozen lefts columns area
     */
    @Input() staticFrozenWidth = '0';

    /**
     * Update columns visibility
     */
    @Input() updateVisibility: Subject<IadGridColumn> = new Subject<IadGridColumn>();

    /**
     * External unselect row action
     */
    @Input() unSelectRow: Subject<boolean> = new Subject<boolean>();

    /**
     * Internal settings changed event
     */
    @Output() onSettingChanged: EventEmitter<CmsSetting> = new EventEmitter<CmsSetting>();

    /**
     * Internal row selection event
     */
    @Output() selectionChange = new EventEmitter<any>();

    /**
     * PrimeNg Table instance
     */
    @ViewChild(IadTableComponent) dt: IadTableComponent;

    /**
     * Templates set as content of iad-grid component (i.e. interlayers)
     */
    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    /**
     * INTERNAL REQUEST TO UPDATE GRID DATA
     */
    internalRefresh: ReplaySubject<string> = new ReplaySubject<string>();

    /**
     * Column components to pass them to column td host
     */
    columnComponents = columnComponents;

    /**
     * INTERNAL COL TEMPLATES set as content of iad-grid component
     */
    colTemplates: { [param: string]: TemplateRef<any> } = {};

    /**
     *  Должны ли выполняться  запросы по загрузке данных.
     *  NPrime моментально регариует на измнение сортировки перезагрузкой данных, что приводит к множественной перезагрузке данных.
     *  С помощеью этого параметра можно отключитьвыполнение загрузки данныхю
     */
    enableLoad = false;

    /**
     * List of dynamically added lefts frozen columns
     */
    frozenCols: IadGridColumn[] = [];

    /**
     * List of dynamically added rights frozen columns
     */
    frozenRightCols: IadGridColumn[] = [];

    /**
     * Width of dynamically added rights frozen columns area
     */
    frozenRightWidth = '0';

    /**
     * Width of dynamically added lefts frozen columns area
     */
    frozenWidth = '0';

    /**
     * Flag to activate loading indicator
     */
    loading: boolean;

    /**
     * Internal resize subject
     */
    resize: Subject<ResizeEvent> = new Subject<ResizeEvent>();

    /**
     * Current primeng table selection
     */
    selection: any;

    /**
     * Count of data items per page
     */
    size: number;

    /**
     * Count of total data items
     */
    totalRecords: number;

    private refreshGridConfigSbt: Subscription;

    constructor(private gridDataService: IadProjectionGridService,
                private configService: IadConfigService,
                @Inject(FILTER_BUILDER) private searchEngine: FilterBuilderInterface,
                private columnsService: BaseGridColumnsService,
                private el: ElementRef
    ) {
        this.size = this.configService.getConfig().pageSize;
        this.enableLoad = false;
    }

    ngOnInit() {
        // Taken from partner project >>
        // Подписка на клик по экшну в тулбаре
        if (this.doTableAction) {
            this.doTableAction.subscribe(action => this.manageTable(action.code, action.value));
        }
        // << Taken from partner project
        if (this.refreshOnInit) {
            this.refresh();
        }
        // Taken from partner project >>
        // Подписка на запрос обновления таблицы
        if (this.refreshGridConfig) {
            this.refreshGridConfigSbt = this.refreshGridConfig.subscribe((data: IadGridConfigModel) => {
                if (!data) {
                    throw new Error('IadGridConfigModel is not passed! Ensure you are using correct way to refresh grid data and config!');
                }
                this.initTableConfig(data);
                this.refresh(data.reset);
            });
        }
        // Subscription to updateVisibility
        if (this.updateVisibility) {
            this.updateVisibility.subscribe(column => this.onColToggle(column));
        }
        // << Taken from partner project
    }

    ngOnDestroy(): void {
        this.refreshGridConfigSbt.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.initUpdateDataSubscription();
    }

    ngAfterContentInit(): void {
        this.templates.forEach(item => {
            this.colTemplates[item.getType()] = item.template;
        });
    }

    /**
     * What is happpen here:
     * When current component is loaded it cannot correctly subscribe to refresh because it calls this.dt methods and props
     * Then we need to create refresh ReplaySubject
     * wait for Sort Event (fired when sortField or sortOrder is set)
     * and finally call that refresh ReplaySubject to update data
     * https://github.com/sunrise-r/interface-admin-ng/issues/66 removed searchUrl checking
     */
    initUpdateDataSubscription() {
        if (this.lazy) {
            this.internalRefresh.subscribe(() => {
                if (this.enableInfiniteScroll) {
                    this.dt.paginatorService.resetFirst();
                }
                this.updateData(this.dt.createLazyLoadMetadata(true));
            });
        }
    }

    /**
     * Handler to toggle columns
     * @param column
     */
    onColToggle(column: IadGridColumn) {
        let frozenStructure = this.getFrozenStructure();
        frozenStructure = this.columnsService.updateContainerSizes(column, frozenStructure, this.el.nativeElement);
        this.updateDataTable(frozenStructure);
        this.updateFrozenSidesInfo(this.columnsService.getGridSidesInformation());
    }

    /**
     * Manual resize of column
     * event.element: Resized column header
     * event.delta: Change of width in number of pixels
     */
    onColResize(event: any): void {
        const frozenStructure = this.getFrozenStructure();
        const data = this.columnsService.resize(event, frozenStructure);
        this.generateSettingsChangedEvent(new CmsSetting('dgColumnWidth', data));
        this.updateFrozenSidesInfo(this.columnsService.getGridSidesInformation());
    }

    /**
     * Обработка события заморозки/разморозки колонки из меню колонки
     */
    onFrozenColumn(event: IadGridFrozenEvent) {
        let frozenStructure = this.getFrozenStructure();
        frozenStructure = this.columnsService.freeze(event, frozenStructure);
        this.updateDataTable(frozenStructure);
        const dgColumnsFrozenInfo = new CmsSetting('dgFrozenInfo', this.columnsService.getFrozenColumns());
        this.generateSettingsChangedEvent(dgColumnsFrozenInfo);
        this.updateFrozenSidesInfo(this.columnsService.getGridSidesInformation());
    }

    /**
     * Обработчик события "Изменена выбранная запись".
     * Просто бросает событие наверх
     * @param event
     */
    onSelectionChange(event: any) {
        this.selectionChange.emit(event);
    }

    /**
     * Manual column order (position) change
     * event.dragIndex: Index of the dragged column
     * event.dropIndex: Index of the dropped column
     * event.columns: Columns array after reorder
     * @param event
     */
    onColReorder(event: any) {
        const frozenStructure = this.getFrozenStructure();
        const settings = new CmsSetting('dgOrderInfo', this.columnsService.getOrderInformation(frozenStructure));
        this.generateSettingsChangedEvent(settings);
    }

    /**
     * Handler to be called when column filter is fullfilled
     * @param event
     * @param col
     */
    onColFilter(event: any, col: any) {
        // this.dt.filters = {}; // commented to solve issue #1745
        this.resetFilter.next(FILTER_TYPE.GLOBAL);
        this.dt.filter(event.value, col.field, col.filterMatchMode);
        this.refresh();
    }

    /**
     * При сортировке таблицы необходимо перезагружать данные
     * @param event
     */
    onSort(event: any) {
        const sort = this.buildSort(event.field, event.order);
        const settings = new CmsSetting('sort', sort);
        this.generateSettingsChangedEvent(settings);
        this.refresh();
    }

    /**
     * Фильтрация данных таблицы
     */
    onFilter(event: any) {
        this.refresh();
    }

    /**
     * @param event
     */
    onNativePager(event: { first: number, rows: number }) {
        // this.updateData(this.dt.createLazyLoadMetadata(true));
        this.refresh();
    }

    /**
     * Перезагрузка данных таблицы
     */
    refresh(reset?: boolean) {
        // Second part of this condition is made to leave compatibility with partner project
        if (reset && !this.enableInfiniteScroll) {
            this.resetNativeTable();
        }
        this.internalRefresh.next();
    }

    /**
     * Method to reset items
     */
    resetValues() {
        this.value = [];
    }

    /**
     * reset native pager
     */
    resetNativeTable() {
        this.dt.reset();
    }

    /**
     * @Todo It would be better to use native angular HttpParams
     * Добавление данных в таблицу
     * @param event
     */
    updateData(event: LazyLoadData): void {
        // #631 we do not need refresh if no searchUrl set and items are set externally
        if (!this.searchUrl) {
             if (this.lazy) { // #1808
                 this.resetValues();
             }
             return;
        }
        this.gridDataService.search(
            this.searchUrl,
            this.buildQuery(event),
            {
                sort: [this.buildSort(event.sortField, event.sortOrder)],
                size: event.rows,
                page: event.first / event.rows
            })
            .subscribe(
                (res: HttpResponse<Array<any>>) => this.addItems(res.body, res.headers, event.clearData),
                () => {
                    if (event.clearData) {
                        this.resetValues();
                    }
                }
            );
    }

    /**
     * Управление таблицей через кнопки тулбара
     * @param action
     * @param value
     */
    manageTable(action, value) {
        const strategy = {
            globalSearch: () => {
                this.dt.filters = {};
                this.resetFilter.next(FILTER_TYPE.PARTICULAR);
                this.dt.filterGlobal(value, 'contains');
                this.refresh();
            },
            clear: () => {
                this.dt.filters = {};
                this.changeTableHeight.next(true);
                this.refresh();
            },
            unselect: () => {
                this.unSelectRow.next(value);
            }
        };
        if (action in strategy) {
            strategy[action]();
        }
    }

    /**
     * Создаёт событие "Настройки изменены"
     * @param settings
     */
    generateSettingsChangedEvent(settings) {
        this.onSettingChanged.next(settings);
    }

    isColumnResizable(col: IadGridColumn) {
        return col.properties && col.properties.resizable !== undefined && col.properties.resizable !== null
            ? col.properties.resizable
            : true;
    }

    isColumnReorderable(col: IadGridColumn) {
        return col.properties && col.properties.reorderable !== undefined && col.properties.reorderable !== null
            ? col.properties.reorderable
            : true;
    }

    isColumnSortable(col: IadGridColumn) {
        return col.sorting !== undefined ? col.sorting : true;
    }

    hasColumnMenu(col: IadGridColumn) {
        return col.properties && col.properties.hasColumnMenu !== undefined && col.properties.hasColumnMenu !== null
            ? col.properties.hasColumnMenu
            : true;
    }

    /**
     * Grid column and common filter query builder
     * @param event
     * event.filter Объект с фильтрами по полям
     * event.globalFilter строка с фильтром
     */
    private buildQuery(event: any): string {
        this.searchEngine.createFilter(this.filterType);
        if (this.filter) {
            this.searchEngine.merge(this.filter);
        }
        const options = {
            globalFilter: event.globalFilter,
            filters: Object.keys(event.filters)
                .filter(field => event.filters[field].value !== null && event.filters[field].value !== '' && field !== 'global')
                .reduce((acu, field) => Object.assign(acu, {
                    [field]: {
                        value: event.filters[field].value,
                        useWildcard: this.columnHasWildCard(field)
                    }
                }), {})
        };
        return this.searchEngine.build(options, event);
    }

    /**
     * Обновляет данные для пейджера и устанавливает список данных
     * @Todo we need to move all the logic inside component-provided services
     * @param data
     * @param headers
     * @param clearData
     */
    private addItems(data: Array<any>, headers: HttpHeaders, clearData?: boolean): void {
        if (clearData) {
            this.resetValues();
        }
        this.totalRecords = parseInt(headers.get('X-Total-Count'), 10);
        this.value = this.value.concat(data);
        this.dt.tableService.onValueChange(data);
        // force current selection reset
        if (this.selection) {
            this.selection = data.find(item => item.id === this.selection.id);
            this.selectionChange.emit(this.selection);
        }
    }

    /**
     * Инициализирует колонки
     * Устанавливает первую колонку слева как закреплённую (это колонка-селектор)
     */
    private initTableConfig(data: IadGridConfigModel): void {
        if (data.filter) {
            this.filter = data.filter;
        }
        if (data.searchUrl) {
            this.searchUrl = data.searchUrl;
        }
        this.dt.frozenColumns = this.frozenCols = data.leftColumns;
        this.dt.frozenRightColumns = this.frozenRightCols = data.rightColumns;
        this.dt.columns = this.columns = data.columns;
        this.dt.frozenWidth = this.frozenWidth = data.leftWidth;
        this.dt.frozenRightWidth = this.frozenRightWidth = data.rightWidth;

        this.dt._sortField = data.sortField;
        this.dt._sortOrder = data.sortOrder;
        if (this.dt.sortMode === 'single' && !this.searchUrl) {
            this.dt.sortSingle();
        }
    }

    /**
     * Returns string to send sort
     * event.sortField = Field name to sort with
     * event.sortOrder = Sort order as number, 1 for asc and -1 for dec
     * @returns {string[]}
     */
    private buildSort(sortField?: string, sortOrder = 1): string {
        if (!sortField) {
            sortField = this.defaultSortField;
        }
        return sortField + ',' + (sortOrder < 0 ? 'desc' : 'asc');
    }

    /**
     * Получаем актуальную для PrimengTable информацию о замороженных колонках
     */
    private getFrozenStructure(): IadGridFrozenStructure {
        const frozenStructure = new IadGridFrozenStructure();
        frozenStructure.left = this.dt.frozenColumns;
        frozenStructure.right = this.dt.frozenRightColumns;
        frozenStructure.center = this.dt.columns;
        frozenStructure.rightWidth = this.dt.frozenRightWidth;
        frozenStructure.leftWidth = this.dt.frozenWidth;
        return frozenStructure;
    }

    /**
     * updates frozen sides information and saves settings
     * @param data
     */
    private updateFrozenSidesInfo(data: IadGridColumnFrozen): void {
        this.dt.frozenWidth = data.leftWidth;
        this.dt.frozenRightWidth = data.rightWidth;
        this.resize.next(<ResizeEvent>{
            frozenLeft: data.leftWidth,
            frozenRight: data.rightWidth
        });
        this.generateSettingsChangedEvent(new CmsSetting('dgSidesInfo', data));
    }

    /**
     * Updates current table structure
     * @param data
     */
    private updateDataTable(data: IadGridFrozenStructure): void {
        this.columns = data.center;
        this.frozenCols = data.left;
        this.frozenRightCols = data.right;
        this.frozenWidth = data.leftWidth;
        this.frozenRightWidth = data.rightWidth;
    }

    /**
     * Check if column has wildcard
     */
    private columnHasWildCard(field: string) {
        const column = this.columns.find(_column => _column.field === field);
        return !column.properties || column.properties.useWildcard !== false;
    }
}
