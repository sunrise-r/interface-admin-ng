import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges, OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';

import * as _ from 'lodash';
import { ToolbarAction, IadGridColumn, FILTER_TYPE, IadGridColumnInterface, IadGridConfigModel, IadGridConfigInterface } from 'iad-interface-admin';
import { CustomizeQuery } from 'iad-interface-admin/filter';
import { IadHelper } from 'iad-interface-admin/core';

import { DocumentListProjection } from '../model/projection.model';

import { PrimeTemplate } from 'primeng/shared';
import { GridSettingsManagerService } from './settings-manager/grid-settings-manager.service';

@Component({
    selector: 'iad-projection-table',
    templateUrl: './projection-table.component.html',
    providers: [GridSettingsManagerService]
})
export class ProjectionTableComponent implements OnInit, OnChanges, AfterContentInit {
    /**
     * Контекст работы компонента.
     * Используется для:
     * Построения url запроса данных
     */
    @Input() context: any = null;

    /**
     * Включать запрос по проекции в запрос данных
     */
    @Input() addProjectionToQuery = true;

    /**
     * Флаг "Разрешить снятие выделения"
     */
    @Input() allowUnSelectRow = false;

    /**
     * #1226 Subject to notify table about height change
     */
    @Input() changeTableHeight: Subject<boolean> = new Subject<boolean>();

    /**
     * #1686 make table and toolbar disabled
     */
    @Input() disabled: boolean;

    /**
     * Внешний дополнительный фильтр CustomizeQuery
     */
    @Input() filter: CustomizeQuery;

    /**
     * Включен ли фильтр по столбцам (По умолчанию true)
     */
    @Input() filterEnabled = true;

    /**
     * Внешние данные для таблицы
     */
    @Input() items: any[] = [];

    /**
     * Код представления
     */
    @Input() presentationCode: string;

    /**
     * Текущая проекция
     */
    @Input() projection: DocumentListProjection;

    /**
     * Ability to pass any templates outside of projection table
     */
    @Input() templates: QueryList<PrimeTemplate>;

    /**
     * Свойства для обновления тулбара
     */
    @Input() toolbarProps: any;

    /**
     * сабжект обновления таблицы
     */
    @Input() refresh: Subject<boolean> = new Subject<boolean>();

    /**
     * Посылает событие сброса фильтра
     */
    @Input() resetFilter: Subject<FILTER_TYPE> = new Subject<FILTER_TYPE>();

    /**
     * Updates settings inside projection-table
     */
    @Input() settingsUpdater: Subject<any> = new Subject<any>();

    /**
     * Flag to check if grid filter should be shown by default
     */
    @Input() showFilter: boolean;

    /**
     * Flag to check if grid search panel should be shown by default
     */
    @Input() showSearchPanel: boolean;

    /**
     * Список "статически замороженных колонок"
     */
    @Input() staticFrozenColumns: IadGridColumnInterface[] = [];

    /**
     * Список "статически замороженных справа колонок"
     */
    @Input() staticFrozenRightColumns: IadGridColumnInterface[] = [];

    /**
     * Размер области "статически замороженных справа колонок
     */
    @Input() staticFrozenRightWidth = '0';

    /**
     * Размер области "статически замороженных колонок"
     */
    @Input() staticFrozenWidth = '0';

    /**
     * сабжект для переключения кнопок тулбара
     */
    @Input() resetToggleableStatus: Subject<{ code: string }> = new Subject<{ code: string }>();

    /**
     * сабжект снятия выделения
     */
    @Input() unSelectRow: Subject<boolean> = new Subject<boolean>();

    /**
     * Включает Lazy Loading если есть URL ресурса
     */
    @Input() lazyLoadingEnabled: boolean;

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
     * Шаблоны для применения в <projection-table></projection-table>
     */
    @ContentChildren(PrimeTemplate) innerTemplates: QueryList<PrimeTemplate>;

    /**
     * Шаблон для добавления контента в правую часть кнопок тулбара
     */
    rightAddonTemplate: TemplateRef<any>;

    /**
     * Template to add content between toolbar and settings-table
     */
    belowTheToolbarTemplates: TemplateRef<any>[] = [];

    /**
     * Все колонки таблицы
     */
    columns: IadGridColumnInterface[] = [];

    /**
     * код группы настроек таблицы
     */
    gridId: string;

    /**
     * Url поиска данных для документа
     */
    searchUrl: String;

    /**
     * Currently selected item
     */
    selection: any;

    /**
     * Subject to invoke any table action
     */
    doTableAction: Subject<{ code: string; value: any }> = new Subject<{ code: string; value: any }>();

    refreshGridConfig: Subject<IadGridConfigModel>;

    updateVisibility: Subject<IadGridColumn>;

    /**
     * Текущая выделенная запись
     */
    private actualSelection: any;

    private refreshSbt: Subscription;

    private settingUpdateSbt: Subscription;

    private static resolveUrl(searchUrl: string, context: any) {
        if (context === null || searchUrl === null) {
            return searchUrl;
        }
        const compiled = _.template(searchUrl);
        return compiled(context);
    }

    constructor(
        private gridSettingsManager: GridSettingsManagerService
    ) {}

    ngOnInit(): void {
        // Подписка на refresh настроек
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
        // #1570 ЗАкомментировалим чтобы убрать тройной запрос
        // Обновление данных при смене аккаунта
        // this.onAccountChangeSbt = this.eventManager.subscribe(onAccountChange, event => this.refreshConfig.next(this.config));
    }

    /**
     * При изменении проекции меняется:
     * Урл источника данных.
     * Ключ по которому храняться настройки.
     * Список колонок
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (('projection' in changes) || ('presentationCode' in changes) || 'filter' in changes) {
            this.gridSettingsManager.reset();

            this.gridId = this.settingsGroupName(this.projection.code);

            this.unSelectRow.next(true);
            this.searchUrl = ProjectionTableComponent.resolveUrl(this.projection.searchUrl, this.context);

            this.gridSettingsManager.setExternalGridConfig(<IadGridConfigInterface>{
                gridId: this.gridId,
                columns: this.initColumns(),
                filter: this.filter,
                searchUrl: this.searchUrl
            }, true);
        }
    }

    ngAfterContentInit() {
        this.updateTemplates(this.templates);
        this.updateTemplates(this.innerTemplates);
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
     * Бросает событие "Строка выбрана в таблице"
     * @param event
     */
    onSelectionChange(event) {
        if (event) {
            this.selection = event;
            this.onSelectedItem(event);
        } else {
            this.selection = event;
            this.onUnSelectItem();
        }
    }

    /**
     * Search event handler
     * @param query
     */
    onSearch(query: string) {
        this.doTableAction.next({ code: 'globalSearch', value: query });
    }

    /**
     * Выбрана строка таблицы
     * @param event
     */
    onSelectedItem(event): void {
        this.selectedItem.next(event);
    }

    /**
     * Снято выделение строки в таблице
     */
    onUnSelectItem() {
        if (!this.actualSelection) {
            return;
        }
        this.actualSelection = undefined;
        this.unSelectedItem.emit();

    }

    /**
     * Обработчик изменения настроек
     * @param settings
     */
    onSettingChanged(settings) {
        this.gridSettingsManager.saveSettings(settings);
    }

    /**
     * Columns initializer
     */
    private initColumns(): IadGridColumn[] {
        // #1429
        this.columns = [];
        this.staticFrozenRightColumns = [];
        this.staticFrozenColumns = [];
        this.staticFrozenRightWidth = '0';
        this.staticFrozenWidth = '0';

        // Статично закреплённая колонка с указателем выделенной строки
        this.staticFrozenWidth = '15px';
        const selectionColumn = new IadGridColumn('rowPointer', '', 'ui-select-button', 'ui-select-button ui-column-gray');
        selectionColumn.formatter = 'SelectionIndicatorColumnComponent';
        selectionColumn.width = 15;
        selectionColumn.properties = {
            resizable: false,
            reorderable: false,
            hasColumnMenu: false,
            sorting: false
        };
        this.staticFrozenColumns.push(selectionColumn);

        // #1380
        this.projection.columns.forEach(column => {
            if (column.properties && column.properties.width) {
                column.width = IadHelper.toInt(column.properties.width);
            }
            if (column.position === 'const-froz-right') {
                this.staticFrozenRightColumns.push(column);
                this.staticFrozenRightWidth = (parseInt(this.staticFrozenRightWidth, 10) + column.width).toString() + 'px';
            } else if (column.position === 'const-froz-left') {
                this.staticFrozenColumns.push(column);
                this.staticFrozenWidth = (parseInt(this.staticFrozenWidth, 10) + column.width).toString() + 'px';
            } else {
                this.columns.push(column);
            }
        });
        return this.columns;
    }

    /**
     * Код для получения настроек проекции
     * @param projectionCode Код проекции
     */
    private settingsGroupName(projectionCode: string): string {
        return this.presentationCode + '.' + projectionCode;
    }

    /**
     * Update templates to show them inside templateOutlets
     * @param templates
     */
    private updateTemplates(templates: QueryList<PrimeTemplate>) {
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
