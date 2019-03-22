import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { of, Subject } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ToolbarActionsCommonHandlerService } from './toolbar-actions-common-handler.service';

import * as _ from 'lodash';

import {
    DATA_DEPENDENCY_LEVEL,
    DataTableColumn,
    DocumentListProjection,
    IProjectionDefaultFilter,
    PresentationHelper,
    SELECT_ACTION
} from '../';
import {
    ActualSelectionChainService,
    ActualSelectionEvent,
    ActualSelectionModel,
    DataTableInformationService,
    IDataTableColumn,
    QueryBuildCallback
} from '../data-table';
import { ToolbarAction } from '../toolbar';

import { ToolbarActionsToggleService } from './toolbar-actions-toggle.service';
import { ElasticSearchQueryBuilder } from 'app/elastic';
import { ActionToggle, toggleColumnSelector } from '../toolbar/table-toolbar/toolbar-action-constants';
import { ToolbarDropdownComponent } from '../toolbar/toolbar-dropdown/toolbar-dropdown.component';

// TODO Может, разделить для операций и для таблиц данных?
@Component({
    selector: 'jhi-projection-table',
    templateUrl: './projection-table.component.html',
    providers: [ToolbarActionsToggleService, ToolbarActionsCommonHandlerService, PresentationHelper]
})
export class ProjectionTableComponent implements OnChanges {
    private _projection: DocumentListProjection;

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
     * Внешний дополнительный фильтр ProjectionDefaultFilter[]
     */
    @Input() filter: IProjectionDefaultFilter[];

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
    @Input()
    get projection(): DocumentListProjection {
        return this._projection;
    }

    set projection(projection: DocumentListProjection) {
        projection.actions = this.toolbarActionsToggleService.disableActions(projection.actions);
        this._projection = projection;
    }

    /**
     * сабжект обновления таблицы
     */
    @Input() refresh: Subject<boolean> = new Subject<boolean>();

    /**
     * Поле выделенной строки для запроса актуальной информации по строке
     */
    @Input() selectionRequestField = 'id';

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
     * сабжект для переключения кнопок тулбара
     */
    @Input() deactivateActionButton: Subject<ActionToggle> = new Subject<ActionToggle>();

    /**
     * тип отображаемой информации - документ или операция
     */
    @Input() type: DATA_DEPENDENCY_LEVEL = DATA_DEPENDENCY_LEVEL.DOCUMENT;

    /**
     * сабжект снятия выделения
     */
    @Input() unSelectRow: Subject<boolean> = new Subject<boolean>();

    /**
     * Нажата какая-либо кнопка в тулбаре
     */
    @Output() actionClicked: EventEmitter<ToolbarAction> = new EventEmitter<ToolbarAction>();

    /**
     * В таблице была выбрна строка
     */
    @Output() selectedItem: EventEmitter<ActualSelectionModel> = new EventEmitter<ActualSelectionModel>();

    /**
     * В таблице было снято выделение строки
     */
    @Output() unSelectedItem: EventEmitter<null> = new EventEmitter<null>();

    /**
     * Column visibility component
     */
    @ViewChild('columnVisibility') columnVisibility: ToolbarDropdownComponent;

    /**
     * Все колонки таблицы
     */
    columns: IDataTableColumn[] = [];

    /**
     * код группы настроек таблицы
     */
    groupSettingsKey: string;

    /**
     * Флаг "Загружать актуальную информацию"
     */
    loadActualInfo: boolean;

    /**
     * Колбек запроса для установки доп. параметров фильтрации
     */
    queryCallback: QueryBuildCallback;

    /**
     * Url поиска данных для документа
     */
    searchUrl: String;

    /**
     * Текущая выделенная запись
     */
    private actualSelection: ActualSelectionModel;

    private static resolveUrl(searchUrl: string, context: any) {
        if (context === null || searchUrl === null) {
            return searchUrl;
        }
        const compiled = _.template(searchUrl);
        return compiled(context);
    }

    constructor(
        private informationService: DataTableInformationService,
        private toolbarActionsToggleService: ToolbarActionsToggleService,
        private eventManager: JhiEventManager,
        private dataPreviewChainService: ActualSelectionChainService,
        private toolbarActionsCommonHandler: ToolbarActionsCommonHandlerService,
        private presentationHelper: PresentationHelper
    ) {}

    /**
     * При изменении проекции меняется:
     * Урл источника данных.
     * Ключ по которому храняться настройки.
     * Список колонок
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['projection'] && this.projection) || (changes['presentationCode'] && this.presentationCode)) {
            this.queryCallback = this.initQueryCallback.bind(this);
            this.initColumns();
            // #issue 1249 we must load actualInfo if it is not false in loadActualInfo input
            this.loadActualInfo = this.initLoadActualInformationFlag();
            this.groupSettingsKey = this.settingsGroupName(this.projection.code);
            this.unSelectRow.next(true);
            this.searchUrl = ProjectionTableComponent.resolveUrl(this.projection.searchUrl, this.context);
        }
    }

    /**
     * Произведён клик в тулбаре
     */
    onActionClicked(action: ToolbarAction): void {
        if (action.code === toggleColumnSelector) {
            this.columnVisibility.doToggle(action.value);
        } else {
            this.toolbarActionsCommonHandler.handle(
                action,
                [this.projection.code, this.presentationCode].join('.'),
                this.actualSelection,
                this.type
            );
        }
        this.actionClicked.emit(action);
    }

    /**
     * Handle any toolbar dropdown hide event
     * @param code
     */
    onHiddenToolbarDropdown(code) {
        this.deactivateActionButton.next(<ToolbarAction>{ code });
    }

    /**
     * Выбрана строка таблицы
     * @param event
     */
    onSelectedItem(event): void {
        if (!event) {
            this.onUnSelectItem();
            return;
        }
        if (event[this.selectionRequestField] === undefined || event[this.selectionRequestField] === null) {
            return;
        }
        this.updateActualInformation(event);
    }

    /**
     * Снято выделение строки в таблице
     */
    onUnSelectItem() {
        if (!this.actualSelection) {
            return;
        }
        this.toolbarActionsToggleService.disableActions(this._projection.actions);
        this.removeSelectedDataFromPreview(this.actualSelection);
        this.actualSelection = undefined;
        this.unSelectedItem.next();
        const event = new ActualSelectionEvent({ action: SELECT_ACTION.UNSELECT, type: this.type });
        this.eventManager.broadcast(event);
    }

    /**
     * Бросить событие снятия выделения
     */
    emitUnSelectItem() {
        if (!this.unSelectRow.closed) {
            this.unSelectRow.next(true);
        }
    }

    /**
     * Init query callback;
     * @param builder
     */
    initQueryCallback(builder: ElasticSearchQueryBuilder) {
        if (this.filter) {
            builder = this.addFilterValues(builder);
        }
        return builder;
    }

    /**
     * Init actual information flag;
     */
    initLoadActualInformationFlag() {
        return this.projection.loadActualInfo === undefined || this.projection.loadActualInfo === null
            ? true
            : this.projection.loadActualInfo;
    }

    /**
     *  will update actual information
     */
    private updateActualInformation(event): void {
        const strategyName = this.loadActualInfo ? 'load' : 'event';
        const strategy = {
            load: () => {
                return this.informationService.find(event[this.selectionRequestField], this.type);
            },
            event: () => {
                return of(<ActualSelectionModel>{
                    documentIndex: {},
                    documentDTO: {},
                    properties: {
                        className: this.presentationHelper.cleanProjectionCode(this.projection.code)
                    }
                });
            }
        };
        strategy[strategyName]().subscribe((response: ActualSelectionModel) => {
            if (response.documentDTO || response.documentIndex) {
                response.action = SELECT_ACTION.SELECT;
                response.selection = event;
                response.type = this.type;
                response.documentDTO = Object.assign({}, response.documentDTO, response.documentIndex);
                this.actualSelection = response;

                this._projection.actions = this.resolveActions(this.actualSelection);
                this.sendSelectionToDataPreview(this.actualSelection);
                this.selectedItem.next(this.actualSelection);
                this.eventManager.broadcast(new ActualSelectionEvent(this.actualSelection));
            }
        });
    }

    /**
     * Columns initializer
     */
    private initColumns(): void {
        // #1429
        this.columns = [];
        this.staticFrozenRightColumns = [];
        this.staticFrozenColumns = [];
        this.staticFrozenRightWidth = '0';
        this.staticFrozenWidth = '0';

        // Статично закреплённая колонка с указателем выделенной строки
        this.staticFrozenWidth = '15px';
        const selectionColumn = new DataTableColumn('rowPointer', '', 'ui-select-button', 'ui-select-button ui-column-gray');
        selectionColumn.formatter = 'SelectionIndicatorColumnComponent';
        selectionColumn.width = '15px';
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
                column.width = column.properties.width;
            }
            if (column.position === 'const-froz-right') {
                this.staticFrozenRightColumns.push(column);
                this.staticFrozenRightWidth = (parseInt(this.staticFrozenRightWidth, 10) + parseInt(column.width, 10)).toString() + 'px';
            } else if (column.position === 'const-froz-left') {
                this.staticFrozenColumns.push(column);
                this.staticFrozenWidth = (parseInt(this.staticFrozenWidth, 10) + parseInt(column.width, 10)).toString() + 'px';
            } else {
                this.columns.push(column);
            }
        });
    }

    /**
     * Код для получения настроек проекции
     * @param projectionCode Код проекции
     */
    private settingsGroupName(projectionCode: string): string {
        return this.presentationCode + '.' + projectionCode;
    }

    /**
     * Добавляет предустановленные значения фильтра.
     * @param builder
     */
    private addFilterValues(builder: ElasticSearchQueryBuilder): ElasticSearchQueryBuilder {
        this.filter.forEach((filter: IProjectionDefaultFilter) => {
            const statement = builder.addColumn(filter.field).setStatementType(filter.statementType);
            filter.values.forEach(value => {
                statement.addStatement(value, false, filter.operator);
            });
        });
        return builder;
    }

    /**
     * Определяем доступность экшнов в тулбаре текущей проекции
     * @param body ActualSelectionModel
     */
    private resolveActions(body: ActualSelectionModel): ToolbarAction[][] {
        if (body.documentDTO) {
            return this.toolbarActionsToggleService.resolveActionsByStatus(this._projection.actions, body);
        }
        return this.toolbarActionsToggleService.enableActions(this._projection.actions);
    }

    /**
     * Отправляем событие, которое передаёт данные в компонент "Окно данные"
     * @param body
     */
    private sendSelectionToDataPreview(body: ActualSelectionModel): void {
        this.dataPreviewChainService.setData(body);
    }

    /**
     * Отправляем событие, которое убирает данные из компонента "Окно данные"
     * @param body
     */
    private removeSelectedDataFromPreview(body: ActualSelectionModel) {
        this.dataPreviewChainService.unsetData(body);
    }
}
