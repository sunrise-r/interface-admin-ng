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
import { ToolbarAction } from '../../toolbar/toolbar-action.model';

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
     * @Todo May be deprecated usage: [columns]="columns". Check.
     * Projection table columns
     */
    @Input() columns: IadGridColumnInterface[];

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
     * Allows to make table and toolbar disabled
     */
    @Input() disabled: boolean;

    /**
     * Flag to set infinite scroll instead of regular paginator
     */
    @Input() enableInfiniteScroll: boolean;

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
    @Input() filterEnabled = true;

    /**
     * String filter builder type.
     */
    @Input() filterType: string;

    /**
     * Table has toolbar right above the header
     */
    @Input() hasToolbar: boolean;

    /**
     * #4 Add paginator to the table
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
     * Update grid subject
     */
    @Input() refresh: Subject<boolean> = new Subject<boolean>();

    /**
     * Flag to set if nested GridComponent should refresh data on initialization
     */
    @Input() refreshOnInit: boolean;

    /**
     * сабжект для переключения кнопок тулбара
     */
    @Input() resetToggleableStatus: Subject<{ code: string }> = new Subject<{ code: string }>();

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
    @Input() staticFrozenColumns: IadGridColumnInterface[];

    /**
     * Список "статически замороженных справа колонок"
     */
    @Input() staticFrozenRightColumns: IadGridColumnInterface[];

    /**
     * Размер области "статически замороженных справа колонок
     */
    @Input() staticFrozenRightWidth;

    /**
     * Размер области "статически замороженных колонок"
     */
    @Input() staticFrozenWidth;

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
    actionClicked: EventEmitter<{ nativeEvent: Event; action: ToolbarAction }> = new EventEmitter<{
        nativeEvent: Event;
        action: ToolbarAction;
    }>();

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
     * Шаблон для добавления контента в правую часть кнопок тулбара
     */
    rightAddonTemplate: TemplateRef<any>;

    /**
     * @Todo May be deprecated usage: [searchUrl]="searchUrl". Check.
     * Search url for nested components
     */
    searchUrl: string;

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
     * Will parse current projection url string as _underscore template string with context variables
     * @param searchUrl
     * @param context
     */
    private static resolveUrl(searchUrl: string, context: any) {
        if (context === null || searchUrl === null) {
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
        if ('projection' in changes || 'presentationCode' in changes || 'filter' in changes) {
            this.gridSettingsManager.reset();
            this.gridId = [this.presentationCode, this.projection.code].join('.');
            this.unSelectRow.next(true);
            if (this.presentationCode && this.projection) {
                this.searchUrl = ProjectionGridComponent.resolveUrl(this.projection.searchUrl, this.context);
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
     * Обработчик изменения настроек
     * @param settings
     */
    onSettingChanged(settings) {
        this.gridSettingsManager.saveSettings(settings);
    }

    /**
     * Search event handler
     * @param query
     */
    onSearch(query: string) {
        this.doTableAction.next({ code: 'globalSearch', value: query });
    }

    /**
     * Произведён клик в тулбаре
     */
    onActionClicked(event: { nativeEvent: Event; action: ToolbarAction }): void {
        const strategy = {
            columnFilter: () => {
                this.showFilter = event.action.active;
                this.showSearchPanel = false;
                this.changeTableHeight.next(true);
            },
            search: () => {
                this.showFilter = false;
                this.resetFilter.next(FILTER_TYPE.PARTICULAR);
                this.showSearchPanel = event.action.active;
                this.changeTableHeight.next(true);
            },
            clear: () => {
                this.resetFilter.next(FILTER_TYPE.BOTH);
                this.doTableAction.next({ code: event.action.code, value: event.action.active });
                this.showSearchPanel = false;
                this.showFilter = false;
            }
        };
        if (event.action.code in strategy) {
            strategy[event.action.code]();
        }
        this.actionClicked.emit(event);
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
            defaultSortField: this.defaultSortField
        };
    }

    initColumns(): IadGridColumn[] {
        this.columns = this.columns || [];
        this.staticFrozenRightColumns = this.staticFrozenRightColumns || [];
        this.staticFrozenColumns = this.staticFrozenColumns || [];
        this.staticFrozenRightWidth = this.staticFrozenRightWidth || '0';
        this.staticFrozenWidth = this.staticFrozenWidth || '0';

        this.projection.columns.forEach(column => {
            if (column.properties && column.properties.width) {
                column.width = IadHelper.toInt(column.properties.width);
            }
            if (column.position === 'const-froz-right') {
                IadHelper.splice(this.staticFrozenRightColumns, column, 'field');
                this.staticFrozenRightWidth = (parseInt(this.staticFrozenRightWidth, 10) + column.width).toString() + 'px';
            } else if (column.position === 'const-froz-left') {
                IadHelper.splice(this.staticFrozenColumns, column, 'field');
                this.staticFrozenWidth = (parseInt(this.staticFrozenWidth, 10) + column.width).toString() + 'px';
            } else {
                IadHelper.splice(this.columns, column, 'field');
            }
        });
        return this.columns;
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
                case 'toolbarRightAddon':
                    this.rightAddonTemplate = item.template;
                    break;
                default:
                    this.belowTheToolbarTemplates.push(item.template);
            }
        });
    }
}
