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
import { JhiAlertService } from 'ng-jhipster';
import { PrimeTemplate } from 'primeng/shared';

import { ITEMS_PER_PAGE } from 'app/shared';

import { ElasticSearchQueryBuilder } from 'app/elastic';

import { CmsSetting, DataTableColumn, DataTableInformationService, FILTER_TYPE, IDataTableColumn } from '../';
import { ReplaySubject, Subject } from 'rxjs';

import { clearFilter, refresh, toggleFilter, toggleSearch } from '../../toolbar/table-toolbar/toolbar-action-constants';
import { DataTableColumnsService } from './data-table-columns.service';
import { DataTableConfigModel } from './data-table-config.model';
import { IadTableComponent, ResizeEvent } from '../../iad-primeng';
import { DTColumnFrozen, FrozenEvent, FrozenStructure } from './freeze-column.model';
import { FilterCommunicationService } from 'app/iad-framework/toolbar/filter/filter-communication.service';

export type QueryBuildCallback = (builder: ElasticSearchQueryBuilder) => ElasticSearchQueryBuilder;

@Component({
    selector: 'jhi-data-table',
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
     * Коллбэк в ктором можено указать дополнительные параметры для построения query
     */
    @Input() onBuildQuery: QueryBuildCallback;

    /**
     * Ссылка на ресурс - источник данных
     */
    @Input() searchUrl: string;

    /**
     * Flag to check if grid filter should be showed
     */
    @Input() showFilter: boolean;

    /**
     * Flag to check if grid filter should be showed
     */
    @Input() showSearchPanel: boolean;

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
     * Посылает событие сброса фильтра
     */
    resetFilter: Subject<FILTER_TYPE> = new Subject<FILTER_TYPE>();

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

    /**
     * Фильтр по проекциям
     */
    projectionFilter: string;

    constructor(
        private dataSearchService: DataTableInformationService,
        private jhiAlertService: JhiAlertService,
        private columnsService: DataTableColumnsService,
        private filterCommunicationService: FilterCommunicationService,
        private el: ElementRef
    ) {
        this.size = ITEMS_PER_PAGE;
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

        // Subscription to update data filters
        if (this.filterCommunicationService) {
            this.filterCommunicationService.getMessage().subscribe(message => this.onFilter(message));
        }
    }

    ngAfterViewInit(): void {
        this.askToRefresh.subscribe(() => {
            this.dt.paginatorService.resetFirst();
            this.updateData(this.dt.createLazyLoadMetadata(true));
        });
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
        this.dt.filters = {};
        this.resetFilter.next(FILTER_TYPE.GLOBAL);
        this.dt.filter(event.value, col.field, col.filterMatchMode);
        this.refresh();
    }

    /**
     * Обновление поискового запроса
     * @param query
     */
    onSearch(query: string) {
        this.dt.filters = {};
        this.resetFilter.next(FILTER_TYPE.PARTICULAR);
        this.dt.filterGlobal(query, 'contains');
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
        this.projectionFilter = event.query;
        this.refresh();
    }

    /**
     * Перезагрузка данных таблицы
     */
    refresh() {
        this.askToRefresh.next();
    }

    /**
     * Добавление данных в таблицу
     * @param event
     */
    updateData(event) {
        // #631 we do not need refresh if no searchUrl set and items are set externally
        if (!this.searchUrl) {
            return;
        }
        this.dataSearchService
            .search(this.searchUrl, {
                query: this.buildQuery(event),
                sort: [this.buildSort(event.sortField, event.sortOrder)],
                size: event.rows,
                page: event.first / event.rows
            })
            .subscribe(
                (res: HttpResponse<Array<any>>) => this.addItems(res.body, res.headers, event.clearData),
                () => {
                    if (event.clearData) {
                        this.items = [];
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
        switch (action) {
            case toggleFilter:
                this.showFilter = value;
                this.showSearchPanel = false;
                this.changeTableHeight.next(true);
                break;
            case toggleSearch:
                this.showFilter = false;
                this.showSearchPanel = value;
                this.changeTableHeight.next(true);
                break;
            case clearFilter:
                this.dt.filters = {};
                this.resetFilter.next(FILTER_TYPE.BOTH);
                this.changeTableHeight.next(true);
                this.showFilter = false;
                this.showSearchPanel = false;
                this.refresh();
                break;
            case refresh:
                this.refresh();
                break;
            case 'unselect':
                this.unSelectRow.next(value);
                break;
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

    private buildQuery(event: any) {
        let queryBuilder = new ElasticSearchQueryBuilder();
        if (event.globalFilter && event.globalFilter !== '') {
            return ElasticSearchQueryBuilder.buildFromString(event.globalFilter);
        }
        if (event.filters) {
            Object.keys(event.filters).forEach((field: string) => {
                if (event.filters[field].value !== null && event.filters[field].value !== '') {
                    const value = event.filters[field].value;
                    queryBuilder.addColumn(field).addStatement(value, true);
                }
            });
            queryBuilder = this.onBuildQuery(queryBuilder);
        }
        if (this.projectionFilter) {
            return queryBuilder.addFromQueryTail(this.projectionFilter);
        }
        return queryBuilder.build();
    }

    /**
     * Обновляет данные для пейджера и устанавливает список данных
     * @param data
     * @param headers
     * @param clearData
     */
    private addItems(data: Array<any>, headers: HttpHeaders, clearData?: boolean) {
        if (clearData) {
            this.items = [];
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
        this.dt.frozenColumns = this.frozenCols = data.leftColumns;
        this.dt.frozenRightColumns = this.frozenRightCols = data.rightColumns;
        this.dt.columns = this.columns = data.columns;
        this.dt.frozenWidth = this.frozenWidth = data.leftWidth;
        this.dt.frozenRightWidth = this.frozenRightWidth = data.rightWidth;
        this.dt._sortField = data.sortField;
        this.dt._sortOrder = data.sortOrder;
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
}
