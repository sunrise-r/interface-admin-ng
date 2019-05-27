import {
  AfterContentInit, AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ReplaySubject, Subject} from 'rxjs';

import {PrimeTemplate} from 'primeng/shared';
import {IadProjectionGridService} from '../services/iad-projection-grid.service';
import {ElasticSearchQueryBuilder} from '../../elastic/elastic-search-query.builder';
import {ElasticService} from '../../elastic/elastic-service';

import {LazyLoadData, ResizeEvent, IadTableComponent, IadConfigService} from 'iad-interface-admin/core';
import {FILTER_TYPE, IadGridConfigModel} from '../model/iad-grid-model';
import {IadGridColumn} from '../model/iad-grid-column.model';
import {columnComponents} from '../column-components/column-components.factory';

export type QueryBuildCallback = (builder: ElasticSearchQueryBuilder) => ElasticSearchQueryBuilder;

/**
 * @todo The main idea is to leave in iad-grid only Inputs and Outputs. This compnent is general template to show full-featured primeng table;
 */
@Component({
  selector: 'iad-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [ElasticService]
})
export class GridComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, OnChanges {
  /**
   * #4 Add paginator to the table
   */
  @Input() paginator: boolean;

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
   * External refresh the table
   */
  @Input() doRefresh: Subject<IadGridConfigModel>;

  /**
   * External table action
   * @TODO check if it is necessary
   */
  @Input() doTableAction: Subject<{ code: string; value: any }>;

  /**
   * Unique ID to identify current table on the page
   * // It was groupSettingsKey
   */
  @Input() gridId: string;

  /**
   * Flag to set infinite scroll
   * @Todo please replace pagers outside the table
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
   * Query builder callback. Allows to set additional query builder params
   * @Todo make query builder as input param and a method to initialize it when it is not passed
   */
  @Input() onBuildQuery: QueryBuildCallback;

  /**
   * Flag to set if table should request data on initialization;
   */
  @Input() refreshOnInit: boolean;

  /**
   * Grid data Source
   */
  @Input() searchUrl: string;

  /**
   * Flag to check if grid header filter should be shown
   */
  @Input() showFilter: boolean;

  /**
   * Flag to check if grid search panel should be shown
   */
  @Input() showSearchPanel: boolean;

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
   * @TODO Check if it is necessary
   */
  @Input() updateVisibility: Subject<IadGridColumn> = new Subject<IadGridColumn>();

  /**
   * External unselect row action
   */
  @Input() unSelectRow: Subject<boolean> = new Subject<boolean>();

  /**
   * Internal settings changed event
   * @TODO Settings changed events should be replaced to upper level wrapper. All the events from table should be passed to upper level
   */
  // @Output() onSettingChanged: EventEmitter<CmsSetting> = new EventEmitter<CmsSetting>();

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
   * @TODO Check if it is necessary
   */
  askToRefresh: ReplaySubject<string> = new ReplaySubject<string>();

  /**
   * INTERNAL COL TEMPLATES set as content of iad-grid component
   */
  colTemplates: { [param: string]: TemplateRef<any> } = {};

  /**
   * Column components to pass them to column td host
   */
  columnComponents = columnComponents;

  /**
   *  Должны ли выполняться  запросы по загрузке данных.
   *  NPrime моментально регариует на измнение сортировки перезагрузкой данных, что приводит к множественной перезагрузке данных.
   *  С помощеью этого параметра можно отключитьвыполнение загрузки данныхю
   * @TODO Check if it is necessary
   */
  enableLoad = false;

  /**
   * List of dynamically added lefts frozen columns
   */
  frozenCols: IadGridColumn[];

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
   * @TODO Check if it is necessary
   * @TODO It might be Input()
   */
  loading: boolean;

  /**
   * Internal reset filters subject
   */
  resetFilter: Subject<FILTER_TYPE> = new Subject<FILTER_TYPE>();

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

  /**
   * Projection filter
   // @todo Так делать не надо. Нужно выносить отсюда....
   */
  projectionFilter: string;

  constructor(private gridDataService: IadProjectionGridService,
              private configService: IadConfigService,
              private elasticService: ElasticService
  ) {
    this.size = this.configService.getConfig().pageSize;
  }

  ngOnInit() {
    /**
     * @todo think if you can do it better
     */
    if (this.refreshOnInit) {
      this.refresh();
    }
    if (this.doRefresh) {
      this.doRefresh.subscribe(() => this.refresh());
    }
  }

  ngOnDestroy(): void {
    this.doRefresh.unsubscribe();
  }

  ngAfterViewInit(): void {
    /**
     * What is happpen here:
     * When current component is loaded it cannot correctly subscribe to refresh because it calls this.dt methods and props
     * Then we need to create refresh ReplaySubject
     * wait for Sort Event (fired when sortField or sortOrder is set)
     * and finally call that refresh ReplaySubject to update data
     * @todo think if you can do it better
     */
    this.askToRefresh.subscribe(() => {
      // @todo WE NEED string below for infinite scroll
      // this.dt.paginatorService.resetFirst();
      this.updateData(this.dt.createLazyLoadMetadata(true));
    });
  }

  ngAfterContentInit(): void {
    this.templates.forEach(item => {
      this.colTemplates[item.getType()] = item.template;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchUrl']) {
      this.refresh();
    }
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

  /**
   * @todo think, how you can do it better
   * Управление таблицей через кнопки тулбара
   * @param action
   * @param value
   */
  manageTable(action, value) {
    switch (action) {
      // case toggleFilter:
      //   this.showFilter = value;
      //   this.showSearchPanel = false;
      //   this.changeTableHeight.next(true);
      //   break;
      // case toggleSearch:
      //   this.showFilter = false;
      //   this.showSearchPanel = value;
      //   this.changeTableHeight.next(true);
      //   break;
      // case clearFilter:
      //   this.dt.filters = {};
      //   this.resetFilter.next(FILTER_TYPE.BOTH);
      //   this.changeTableHeight.next(true);
      //   this.showFilter = false;
      //   this.showSearchPanel = false;
      //   this.refresh();
      //   break;
      // case refresh:
      //   this.refresh();
      //   break;
      case 'unselect':
        this.unSelectRow.next(value);
        break;
    }
  }

  /**
   *@todo move to upper level
   * @param col
   */
  // hasColumnMenu(col: DataTableColumn) {
  //   return col.properties && col.properties.hasColumnMenu !== undefined && col.properties.hasColumnMenu !== null
  //     ? col.properties.hasColumnMenu
  //     : true;
  // }

  /**
   * @todo since we dont use onLazyLoad it can be moved to upper level
   * Добавление данных в таблицу
   * @param event
   */
  updateData(event: LazyLoadData): void {
    // #631 we do not need refresh if no searchUrl set and items are set externally
    if (!this.searchUrl) {
      return;
    }
    this.gridDataService
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
            this.value = [];
          }
        }
      );
  }

  /**
   * Manual resize o column
   * @Todo we need to pass all the events to the upper level
   * event.element: Resized column header
   * event.delta: Change of width in number of pixels
   */
  onColResize(event: any): void {
    // const frozenStructure = this.getFrozenStructure();
    // const data = this.columnsService.resize(event, frozenStructure);
    // this.generateSettingsChangedEvent(new CmsSetting('dgColumnWidth', data));
    // this.updateFrozenSidesInfo(this.columnsService.getGridSidesInformation());
  }

  /**
   * MAnual column order (position) change
   * @Todo we need to pass all the events to the upper level
   * event.dragIndex: Index of the dragged column
   * event.dropIndex: Index of the dropped column
   * event.columns: Columns array after reorder
   * @param event
   */
  onColReorder(event: any) {
    // const frozenStructure = this.getFrozenStructure();
    // const settings = new CmsSetting('dgOrderInfo', this.columnsService.getOrderInformation(frozenStructure));
    // this.generateSettingsChangedEvent(settings);
  }

  /**
   * При сортировке таблицы необходимо перезагружать данные
   * @Todo we need to pass all the events to the upper level
   * @param event
   */
  onSort(event: any) {
    // const sort = this.buildSort(event.field, event.order);
    // const settings = new CmsSetting('sort', sort);
    // this.generateSettingsChangedEvent(settings);
    this.refresh();
  }

  /**
   * @todo look how to do it better
   * Фильтрация данных таблицы
   */
  onFilter(event: any) {
    // @todo Так делать не надо. Нужно выносить отсюда....
    // this.projectionFilter = event.query;
    // this.refresh();
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
   * @param event
   */
  onNativePager(event: {first: number, rows: number}) {
    // this.updateData(this.dt.createLazyLoadMetadata(true));
    this.refresh();
  }

  /**
   * Handler to be called when column filter is fullfilled
   * @Todo we need to pass all the events to the upper level
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
   * This method sends refresh event
   */
  refresh() {
    this.askToRefresh.next();
  }

  /**
   * Grid column and common filter query builder
   * @Todo we need to move all the logic inside component-provided services
   * @param event
   * event.filter Объект с фильтрами по полям
   * event.globalFilter строка с фильтром
   */

  private buildQuery(event: any): string {
    let queryBuilder = this.elasticService.createFilter();
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
      if (this.onBuildQuery) {
        queryBuilder = this.onBuildQuery(queryBuilder);
      }
    }
    // @todo Так делать не надо. Нужно выносить отсюда....
    // if (this.projectionFilter) {
    //   return queryBuilder.addFromQueryTail(this.projectionFilter);
    // }
    return queryBuilder.build();
  }

  /**
   * Returns string to send sort
   * @Todo we need to move all the logic inside component-provided services
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
   * Обновляет данные для пейджера и устанавливает список данных
   * @Todo we need to move all the logic inside component-provided services
   * @param data
   * @param headers
   * @param clearData
   */
  private addItems(data: Array<any>, headers: HttpHeaders, clearData?: boolean): void {
    this.totalRecords = parseInt(headers.get('X-Total-Count'), 10);
    this.value = clearData ? data : this.value.concat(data);
    this.dt.tableService.onValueChange(data);
    // force current selection reset
    if (this.selection) {
      this.selection = data.find(item => item.id === this.selection.id);
      this.selectionChange.emit(this.selection);
    }
  }
}
