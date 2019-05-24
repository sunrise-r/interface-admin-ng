import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { PrimeTemplate } from 'primeng/shared';
import { ReplaySubject, Subject } from 'rxjs';
import { IadTableComponent, ResizeEvent } from 'iad-interface-admin/core';

import { DataTableColumnsService } from './data-table-columns.service';
import { DataTableConfigModel } from './data-table-config.model';
import { DTColumnFrozen, FrozenEvent, FrozenStructure } from './freeze-column.model';
import { FilterBuilderService } from '../../filter-builder/filter-builder.service';
import { CustomizeQuery } from '../../filter-builder/action/customize-query';
import {DataTableColumn, FILTER_TYPE, IDataTableColumn} from './data-table.model';
import {DataTableInformationService} from '../services/data-table-information.service';
import {CmsSetting} from '../services/settings-provider';

@Component({
    selector: 'iad-data-table',
    templateUrl: './data-table.component.html',
    providers: [DataTableColumnsService]
})
export class DataTableComponent implements OnInit, AfterViewInit, AfterContentInit {
    /**
     * Возможность снятия выделения строки таблицы
     */
    @Input() allowUnSelectRow: boolean;

    /**
     * #1226 Subject to notify table about height change
     */
    @Input() changeTableHeight: Subject<boolean> = new Subject<boolean>();

    /**
     * Видимые колонки таблицы
     */
    @Input() columns: IDataTableColumn[];

    /**
     * Поле для сортировки по умолчанию
     */
    @Input() defaultSortField = 'id';

    /**
     * Входящее событие перезагрузки данных таблицы
     */
    @Input() doRefresh: Subject<DataTableConfigModel>;

    /**
     * Входящее событие выполнения внешнего действия с таблицей
     */
    @Input() doTableAction: Subject<{ code: string; value: any }>;

    /**
     * Название группы настроек. Будет использованная при сохранении настроек на стороне сервера.
     */
    @Input() groupSettingsKey: string;

    /**
     * Айтемы для отображения в таблице
     */
    @Input() items: any[] = [];

    /**
     * Включает Lazy Loading если есть URL ресурса
     */
    @Input() lazyLoadingEnabled: boolean;

    /**
     * Дополнительный фильтр
     */
    @Input() filter: CustomizeQuery;

    /**
     * Посылает событие сброса фильтра
     */
    @Input() resetFilter: Subject<FILTER_TYPE> = new Subject<FILTER_TYPE>();

    /**
     * Ссылка на ресурс - источник данных
     */
    @Input() searchUrl: string;

    /**
     * Flag to check if grid filter should be showed
     */
    @Input() showFilter: boolean;

    /**
     * Поле для сортировки
     */
    @Input() sortField: string;

    /**
     * Порядок сортировки
     */
    @Input() sortOrder: number;

    /**
     * Список "статически замороженных колонок"
     */
    @Input() staticFrozenColumns: IDataTableColumn[] = [];

    /**
     * Список "статически замороженных справа колонок"
     */
    @Input() staticFrozenRightColumns: IDataTableColumn[] = [];

    /**
     * Размер области "статически замороженных справа колонок
     */
    @Input() staticFrozenRightWidth = '0';

    /**
     * Размер области "статически замороженных колонок"
     */
    @Input() staticFrozenWidth = '0';

    /**
     * Изменение размеров таблицы
     */
    @Input() updateVisibility: Subject<IDataTableColumn> = new Subject<IDataTableColumn>();

    /**
     * сабжект снятия выделения
     */
    @Input() unSelectRow: Subject<boolean> = new Subject<boolean>();

    /**
     * Событие смены настроек
     */
    @Output() onSettingChanged: EventEmitter<CmsSetting> = new EventEmitter<CmsSetting>();

    /**
     * Событие того, что выбран row в таблице
     */
    @Output() selectionChange = new EventEmitter<any>();

    /**
     * PrimeNg Table instance
     */
    @ViewChild(IadTableComponent) dt: IadTableComponent;

    /**
     * PrimeNg Table templates
     */
    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    /**
     * Запрос обновления данных таблицы
     */
    askToRefresh: ReplaySubject<string> = new ReplaySubject<string>();

    /**
     * Шаблоны в виде key=>value
     */
    colTemplates: { [param: string]: TemplateRef<any> } = {};

    /**
     *  Должны ли выполняться  запросы по загрузке данных.
     *  NPrime моментально регариует на измнение сортировки перезагрузкой данных, что приводит к множественной перезагрузке данных.
     *  С помощеью этого параметра можно отключитьвыполнение загрузки данныхю
     */
    enableLoad = false;

    /**
     * Список "замороженных колонок"
     */
    frozenCols: IDataTableColumn[] = [];

    /**
     * Список "замороженных колонок" справа
     */
    frozenRightCols: IDataTableColumn[] = [];

    /**
     * Размер области "замороженных колонок" справа
     */
    frozenRightWidth = '0';

    /**
     * Размер области "замороженных колонок"
     */
    frozenWidth = '0';

    /**
     * Флаг, активирующий спинер
     */
    loading: boolean;

    /**
     * Изменение размеров таблицы
     */
    resize: Subject<ResizeEvent> = new Subject<ResizeEvent>();

    /**
     * Текущее выделение в таблице
     */
    selection: any;

    /**
     * Размер каждой страницы по айтемам
     */
    size: number;

    /**
     * Количество записей, доступных для загрузки
     */
    totalItems: number;

    constructor(
        private dataSearchService: DataTableInformationService,
        private columnsService: DataTableColumnsService,
        private filterBuilderService: FilterBuilderService,
        private el: ElementRef
    ) {
        this.size = 60; //  <-------@TODO MUST BE INPUT
        this.enableLoad = false;
    }

    ngOnInit() {
        // Подписка на клик по экшну в тулбаре
        if (this.doTableAction) {
            this.doTableAction.subscribe(action => this.manageTable(action.code, action.value));
        }
        // Подписка на запрос обновления таблицы
        if (this.doRefresh) {
            this.doRefresh.subscribe((data: DataTableConfigModel) => {
                this.initTableConfig(data);
                this.refresh();
            });
        }
        // Subscription to updateVisibility
        if (this.updateVisibility) {
            this.updateVisibility.subscribe(column => this.onColToggle(column));
        }
    }

    ngAfterViewInit(): void {
        // issue #779
        if (this.lazyLoadingEnabled && this.searchUrl) {
            this.askToRefresh.subscribe(() => {
                this.dt.paginatorService.resetFirst();
                this.updateData(this.dt.createLazyLoadMetadata(true));
            });
        }
    }

    ngAfterContentInit(): void {
        this.templates.forEach(item => {
            this.colTemplates[item.getType()] = item.template;
        });
    }

    /**
     * Handler to toggle columns
     * @param column
     */
    onColToggle(column: IDataTableColumn) {
        let frozenStructure = this.getFrozenStructure();
        frozenStructure = this.columnsService.updateContainerSizes(column, frozenStructure, this.el.nativeElement);
        this.updateDataTable(frozenStructure);
        this.updateFrozenSidesInfo(this.columnsService.getGridSidesInformation());
    }

    /**
     * Ручное изменение размера колонки
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
    onFrozenColumn(event: FrozenEvent) {
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
     * Смена мест колонок
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
     * Обработчик фильтра
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
     * Перезагрузка данных таблицы
     */
    refresh() {
        this.askToRefresh.next();
    }

    /**
     * Method to reset items
     */
    reset() {
        this.items = [];
    }

    /**
     * Добавление данных в таблицу
     * @param event
     */
    updateData(event) {
        // #631 we do not need refresh if no searchUrl set and items are set externally
        if (!this.searchUrl) {
            // #1808
            if (this.lazyLoadingEnabled) {
                this.reset();
            }
            return;
        }
        this.dataSearchService
            .search(
                this.searchUrl,
                {
                    sort: [this.buildSort(event.sortField, event.sortOrder)],
                    size: event.rows,
                    page: event.first / event.rows
                },
                this.buildQuery(event)
            )
            .subscribe(
                (res: HttpResponse<Array<any>>) => this.addItems(res.body, res.headers, event.clearData),
                () => {
                    if (event.clearData) {
                        this.reset();
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
            refresh: () => this.refresh,
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

    /**
     * Calculate colspan for all non frozen columns
     */
    calculateNonFrozenColspan(): number {
        if (!this.columns) {
            return 0;
        }
        return this.columns.filter(col => col.visible && !col.frozen).length;
    }

    isColumnResizable(col: DataTableColumn) {
        return col.properties && col.properties.resizable !== undefined && col.properties.resizable !== null
            ? col.properties.resizable
            : true;
    }

    isColumnReorderable(col: DataTableColumn) {
        return col.properties && col.properties.reorderable !== undefined && col.properties.reorderable !== null
            ? col.properties.reorderable
            : true;
    }

    isColumnSortable(col: DataTableColumn) {
        return col.sorting !== undefined ? col.sorting : true;
    }

    hasColumnMenu(col: DataTableColumn) {
        return col.properties && col.properties.hasColumnMenu !== undefined && col.properties.hasColumnMenu !== null
            ? col.properties.hasColumnMenu
            : true;
    }

    /**
     * Фильтр по колонке
     * @param event
     * event.filter Объект с фильтрами по полям
     * event.globalFilter строка с фильтром
     */

    private buildQuery(event: any): String {
        const filterBuilder = this.filterBuilderService.createFilter();
        if (this.filter) {
            filterBuilder.merge(this.filter.raw());
        }
        if (event.globalFilter && event.globalFilter !== '') {
            filterBuilder.addFilter('all', event.globalFilter, false).addOption('allMatchDelegate');
        } else if (event.filters) {
            Object.keys(event.filters)
                .filter(field => event.filters[field].value !== null && event.filters[field].value !== '')
                .forEach((field: string) => {
                    const value = event.filters[field].value;
                    filterBuilder.addFilter(field, value, this.columnHasWildCard(field));
                });
        }
        if (event.sortField && event.sortField === 'onResolution') {
            filterBuilder.addOption('resolutionSortingDelegate', 'sort', 'onResolution');
        }
        if (event.sortField && event.sortField === 'onOperation') {
            filterBuilder.addOption('operationSortingDelegate', 'sort', 'onOperation');
        }
        return filterBuilder.build();
    }

    /**
     * Обновляет данные для пейджера и устанавливает список данных
     * @param data
     * @param headers
     * @param clearData
     */
    private addItems(data: Array<any>, headers: HttpHeaders, clearData?: boolean) {
        if (clearData) {
            this.reset();
        }
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        data.forEach(el => this.items.push(el));
        this.dt.tableService.onValueChange(data);
        if (this.selection) {
            this.selection = data.find(item => item.id === this.selection.id);
            this.selectionChange.emit(this.selection);
        }
    }

    /**
     * Инициализирует колонки
     * Устанавливает первую колонку слева как закреплённую (это колонка-селектор)
     */
    private initTableConfig(data: DataTableConfigModel): void {
        if (data.filter) {
            this.filter = data.filter;
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
     * Формирует массив сортировок
     * event.sortField = Field name to sort with
     * event.sortOrder = Sort order as number, 1 for asc and -1 for dec
     * @returns {string[]}
     */
    private buildSort(sortField?: string, sortOrder = 1) {
        if (!sortField) {
            sortField = this.defaultSortField;
        }
        return sortField + ',' + (sortOrder < 0 ? 'desc' : 'asc');
    }

    /**
     * Получаем актуальную для PrimengTable информацию о замороженных колонках
     */
    private getFrozenStructure(): FrozenStructure {
        const frozenStructure = new FrozenStructure();
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
    private updateFrozenSidesInfo(data: DTColumnFrozen): void {
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
    private updateDataTable(data: FrozenStructure): void {
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
