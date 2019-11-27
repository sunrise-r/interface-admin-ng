import * as _ from 'lodash';
import {
    AfterContentInit,
    Component,
    ContentChildren, EventEmitter,
    Input,
    OnChanges,
    OnInit, Output,
    QueryList,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { PrimeTemplate } from 'primeng/shared';
import { Subject, Subscription } from 'rxjs';
import { CustomizeQuery } from 'iad-interface-admin/filter';
import { IadHelper } from 'iad-interface-admin/core';

import { DocumentListProjection } from '../model/projection-grid.model';
import { IadGridColumn, IadGridColumnInterface } from '../../iad-base-grid/model/iad-grid-column.model';
import { IadGridConfigInterface, FILTER_TYPE } from '../../iad-base-grid/model/iad-grid-model';
import { GridSettingsManagerService } from '../settings-manager/grid-settings-manager.service';
import { ToolbarClickEvent } from '../../toolbar/iad-toolbar-action.model';
import { IadGridColumnFrozenField, IadGridColumnOrder } from '../../iad-base-grid/base-grid/base-grid-freeze-column.model';

@Component({
    selector: 'iad-projection-grid',
    templateUrl: './projection-grid.component.html',
    providers: [GridSettingsManagerService]
})
export class ProjectionGridComponent implements OnInit, AfterContentInit, OnChanges {
    /**
     * Флаг "Разрешить снятие выделения"
     */
    @Input() allowUnSelectRow = false;

    /**
     * Subject to notify table about height change
     */
    @Input() changeTableHeight: Subject<boolean> = new Subject<boolean>();

    /**
     * Projection table columns
     */
    @Input()
    get columns(): IadGridColumnInterface[] {
        return this._columns;
    }
    set columns(columns: IadGridColumnInterface[]) {
        console.error('Columns are allowed to set only from @Input() projection. Direct setting is deprecated and affects nothing since v1.0.6');
    }

    /**
     * Column components to pass them to column td host
     */
    @Input() columnComponents: { [param: string]: any };

    /**
     * Контекст работы компонента.
     * Используется для:
     * Построения url запроса данных
     */
    @Input() context: any = null;

    /**
     * Setting of default sort field
     */
    @Input() defaultSortField: string;

    /**
     * Setting of default sort order
     */
    @Input() defaultSortOrder: string;

    /**
     * Allows to make table and toolbar disabled
     */
    @Input() disabled: boolean;

    /**
     * Flag to set infinite scroll instead of regular paginator
     */
    @Input() enableInfiniteScroll: boolean;

    /**
     * Flag to set custom perfect scroll instead of regular browser scroll
     */
    @Input() enablePerfectScroll: boolean;

    /**
     * Ability to pass any templates outside of projection table
     */
    @Input() externalTemplates: QueryList<PrimeTemplate>;

    /**
     * External additional filter of type "CustomizeQuery"
     */
    @Input() filter: CustomizeQuery;

    /**
     * Включен ли фильтр по столбцам (По умолчанию true)
     */
    @Input() filterEnabled: boolean;

    /**
     * String filter builder type.
     */
    @Input() filterType: string;

    /**
     * Add paginator to the table
     */
    @Input() paginator: boolean;

    /**
     * unique code to identify current presentation
     */
    @Input() presentationCode: string;

    /**
     * Current grid projection
     */
    @Input() projection: DocumentListProjection;

    /**
     * Enable data loading from backend
     */
    @Input() lazy: boolean;

    /**
     * Style class for table
     */
    @Input() tableStyleClass: string;

    /**
     * Update grid subject
     */
    @Input() refresh: Subject<boolean> = new Subject<boolean>();

    /**
     * Flag to set if nested GridComponent should refresh data on initialization
     */
    @Input() refreshOnInit: boolean;

    /**
     * Flag to add 'responsive' css class
     */
    @Input() responsive: boolean;

    /**
     * Flag to check if grid filter should be shown
     */
    @Input() showFilter: boolean;

    /**
     * Flag to check if grid search panel should be shown by default
     */
    @Input() showSearchPanel: boolean;

    /**
     * Updates settings inside projection-table
     */
    @Input() settingsUpdater: Subject<any> = new Subject<any>();

    /**
     * Список "статически замороженных колонок"
     */
    @Input()
    set staticFrozenColumns(columns: IadGridColumnInterface[]) {
        this._externalStaticFrozenColumns = columns;
    }
    get staticFrozenColumns(): IadGridColumnInterface[] {
        return this._staticFrozenColumns;
    }

    /**
     * Список "статически замороженных справа колонок"
     */
    @Input()
    set staticFrozenRightColumns(columns: IadGridColumnInterface[]) {
        this._externalStaticFrozenRightColumns = columns;
    }
    get staticFrozenRightColumns(): IadGridColumnInterface[] {
        return this._staticFrozenRightColumns;
    }

    /**
     * Размер области "статически замороженных справа колонок
     */
    @Input()
    set staticFrozenRightWidth(width: string) {
        this._externalStaticFrozenRightWidth = width;
    }
    get staticFrozenRightWidth(): string {
        return this._staticFrozenRightWidth;
    }

    /**
     * Размер области "статически замороженных колонок"
     */
    @Input()
    set staticFrozenWidth(width: string) {
        this._externalStaticFrozenWidth = width;
    }
    get staticFrozenWidth(): string {
        return this._staticFrozenWidth;
    }

    /**
     * Свойства для обновления тулбара
     */
    @Input() toolbarProps: any;

    /**
     * сабжект снятия выделения
     */
    @Input() unSelectRow: Subject<boolean> = new Subject<boolean>();

    /**
     * Projection table values
     */
    @Input() value: any[] = [];

    /**
     * Нажата какая-либо кнопка в тулбаре
     */
    @Output()
    actionClicked: EventEmitter<ToolbarClickEvent> = new EventEmitter<ToolbarClickEvent>();

    /**
     * В таблице была выбрна строка
     */
    @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

    /**
     * В таблице было снято выделение строки
     */
    @Output() unSelectedItem: EventEmitter<null> = new EventEmitter<null>();

    /**
     * PrimeNg Table templates
     */
    @ContentChildren(PrimeTemplate) innerTemplates: QueryList<PrimeTemplate>;

    /**
     * Template to add content between toolbar and settings-table
     */
    belowTheToolbarTemplates: TemplateRef<any>[] = [];

    /**
     * Subject to invoke any action for nested BaseGridComponent
     */
    doTableAction: Subject<{ code: string; value: any }> = new Subject<{ code: string; value: any }>();

    /**
     * @Todo May be deprecated usage: [gridId]="gridId". Check.
     * код группы настроек таблицы for nested BaseGridComponent
     */
    gridId: string;

    /**
     * Table config subject for nested BaseGridComponent
     */
    refreshGridConfig: Subject<IadGridConfigInterface> = new Subject<IadGridConfigInterface>();

    /**
     * Filter reset subject for nested components
     */
    resetFilter: Subject<FILTER_TYPE> = new Subject<FILTER_TYPE>();

    /**
     * @Todo May be deprecated usage: [searchUrl]="searchUrl". Check.
     * Search url for nested components
     */
    searchUrl: string;

    /**
     * Toolbar template to add before table
     */
    toolbarTemplate: TemplateRef<any>;

    /**
     * Columns visibility change subject for nested components
     */
    updateVisibility: Subject<IadGridColumn>;

    /**
     * Subscription for refresh subject
     */
    private refreshSbt: Subscription;

    /**
     * Subscription for updateGridSettings subject
     */
    private settingUpdateSbt: Subscription;

    /**
     * Grid columns
     */
    private _columns: IadGridColumnInterface[];

    /**
     * Список "статически замороженных колонок"
     */
    private _externalStaticFrozenColumns: IadGridColumnInterface[];

    /**
     * Список "статически замороженных справа колонок"
     */
    private _externalStaticFrozenRightColumns: IadGridColumnInterface[];

    /**
     * Размер области "статически замороженных справа колонок
     */
    private _externalStaticFrozenRightWidth;

    /**
     * Размер области "статически замороженных колонок"
     */
    private _externalStaticFrozenWidth;

    /**
     * Список "статически замороженных колонок"
     */
    private _staticFrozenColumns: IadGridColumnInterface[];

    /**
     * Список "статически замороженных справа колонок"
     */
    private _staticFrozenRightColumns: IadGridColumnInterface[];

    /**
     * Размер области "статически замороженных справа колонок
     */
    private _staticFrozenRightWidth;

    /**
     * Размер области "статически замороженных колонок"
     */
    private _staticFrozenWidth;

    /**
     * Will parse current projection url string as _underscore template string with context variables
     * @param searchUrl
     * @param context
     */
    private static resolveUrl(searchUrl: string, context: any) {
        if (context === undefined || context === null || searchUrl === null || searchUrl === undefined) {
            return searchUrl;
        }
        const compiled = _.template(searchUrl);
        return compiled(context);
    }

    constructor(private gridSettingsManager: GridSettingsManagerService) {}

    ngOnInit() {
        this.refreshSbt = this.refresh.subscribe(() => {
            this.gridSettingsManager.refresh();
        });
        this.settingUpdateSbt = this.settingsUpdater.subscribe(event => {
            if (event.name === 'columns') {
                this.gridSettingsManager.updateColumnsVisibility(event.content.columns, event.content.prevEvent);
            }
        });
        this.updateVisibility = this.gridSettingsManager.updateVisibility;
        this.refreshGridConfig = this.gridSettingsManager.refreshGridConfig;
    }

    ngAfterContentInit(): void {
        this.updateTemplates(this.externalTemplates);
        this.updateTemplates(this.innerTemplates);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.projection && ('projection' in changes || 'presentationCode' in changes || 'filter' in changes)) {
            this.gridSettingsManager.reset();
            this.unSelectRow.next(true);
            if (this.presentationCode) {
                this.gridId = [this.presentationCode, this.projection.code].join('.');
                this.searchUrl = ProjectionGridComponent.resolveUrl(this.projection.searchUrl, this.context);
            } else {
                console.error('Warning! presentationCode is not set!');
                this.gridId = '_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            }
            this.gridSettingsManager.setExternalGridConfig(this.populateGridConfig(), true);
        }
    }

    /**
     * Бросает событие "Строка выбрана в таблице"
     * @param event
     */
    onSelectionChange(event) {
        if (event) {
            this.selectedItem.next(event);
        } else {
            this.unSelectedItem.emit();
        }
    }

    /**
     * Handler of on column size change event
     * will propagate object with column names as keys and sizes as value;
     * @param event
     */
    onColumnResize(event: { [param: string]: string | number }) {
        this.gridSettingsManager.saveSettings('dgColumnWidth', event);
    }

    /**
     * Handler of any column is dynamically made frozen event
     * will propagate array with field name, frozen state and frozen area for each column
     * @param event
     */
    onColumnFrozen(event: IadGridColumnFrozenField[]) {
        this.gridSettingsManager.saveSettings('dgFrozenInfo', event);
    }

    /**
     * Handler of any column position is changed in a drag and drop way event
     * @param event
     */
    onColumnReorder(event: IadGridColumnOrder[]) {
        this.gridSettingsManager.saveSettings('dgOrderInfo', event);
    }

    /**
     * Handler of any column is sorted event
     * @param event
     */
    onColumnSort(event: {value: string, field: string, order: number}) {
        this.gridSettingsManager.config.set('sortField', event.field);
        this.gridSettingsManager.config.set('sortOrder', event.order);
        this.gridSettingsManager.saveSettings('sort', event.value);
    }

    /**
     * Handler of update frozen areas sizes event
     * @param event
     */
    onFrozenAreasUpdated(event: string) {
        this.gridSettingsManager.saveSettings('dgSidesInfo', event);
    }

    /**
     * Search event handler
     * @param query
     */
    onSearch(query: string) {
        this.doTableAction.next({ code: 'globalSearch', value: query });
    }

    /**
     * Populate grid config out of current @Input()'s
     */
    populateGridConfig(): IadGridConfigInterface {
        return <IadGridConfigInterface>{
            gridId: this.gridId,
            columns: this.initColumns(),
            filter: this.filter,
            searchUrl: this.searchUrl,
            defaultSortField: this.defaultSortField,
            defaultSortOrder: this.defaultSortOrder === 'asc' ? 1 : -1
        };
    }

    initColumns(): IadGridColumn[] {
        this._columns = [];
        this._staticFrozenRightColumns = this._externalStaticFrozenRightColumns ? [...this._externalStaticFrozenRightColumns] : [];
        this._staticFrozenColumns = this._externalStaticFrozenColumns ? [...this._externalStaticFrozenColumns] : [];
        this._staticFrozenRightWidth = this._externalStaticFrozenRightWidth ? this._externalStaticFrozenRightWidth : '0';
        this._staticFrozenWidth = this._externalStaticFrozenWidth ? this._externalStaticFrozenWidth : '0';
        if (this.projection) {
            this.projection.columns.forEach(column => {
                if (column.properties && column.properties.width) {
                    column.width = IadHelper.toInt(column.properties.width);
                }
                if (column.position === 'const-froz-right') {
                    IadHelper.splice(this._staticFrozenRightColumns, column, 'field');
                    this._staticFrozenRightWidth = (parseInt(this._staticFrozenRightWidth, 10) + column.width).toString() + 'px';
                } else if (column.position === 'const-froz-left') {
                    IadHelper.splice(this._staticFrozenColumns, column, 'field');
                    this._staticFrozenWidth = (parseInt(this._staticFrozenWidth, 10) + column.width).toString() + 'px';
                } else {
                    IadHelper.splice(this._columns, column, 'field');
                }
            });
        }
        return this._columns;
    }

    /**
     * Update templates to show them inside templateOutlets
     * @param templates
     */
    private updateTemplates(templates: QueryList<PrimeTemplate>) {
        if (!templates) {
            return;
        }
        templates.forEach(item => {
            switch (item.getType()) {
                case 'toolbar':
                    this.toolbarTemplate = item.template;
                    break;
                default:
                    this.belowTheToolbarTemplates.push(item.template);
            }
        });
    }
}
