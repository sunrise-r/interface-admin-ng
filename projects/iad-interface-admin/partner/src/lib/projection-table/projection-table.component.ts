import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { of, Subject } from 'rxjs';

import * as _ from 'lodash';
import { ToolbarAction, IadGridColumn, FILTER_TYPE, IadGridColumnInterface, IadGridRowSelection, SELECT_ACTION } from 'iad-interface-admin';
import { IadEventManager, IadHelper } from 'iad-interface-admin/core';
import { CustomizeQuery } from 'iad-interface-admin/filter';

import { DATA_DEPENDENCY_LEVEL, DocumentListProjection } from '../model/projection.model';

import { DataTableInformationService } from '../services/data-table-information.service';
import { ActualSelectionChainService } from '../services/actual-selection-chain.service';
import { PresentationHelper } from '../services/presentation-helper';

import { DataChainService } from '../services/data-chain.service';
import { PrimeTemplate } from 'primeng/shared';

// TODO Может, разделить для операций и для таблиц данных?
@Component({
    selector: 'iad-projection-table',
    templateUrl: './projection-table.component.html',
    providers: [PresentationHelper]
})
export class ProjectionTableComponent implements OnChanges, AfterContentInit {
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
     * Поле выделенной строки для запроса актуальной информации по строке
     */
    @Input() selectionRequestField = 'id';

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
     * тип отображаемой информации - документ или операция
     */
    @Input() type: DATA_DEPENDENCY_LEVEL = DATA_DEPENDENCY_LEVEL.DOCUMENT;

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
    groupSettingsKey: string;

    /**
     * Флаг "Загружать актуальную информацию"
     */
    loadActualInfo: boolean;

    /**
     * Url поиска данных для документа
     */
    searchUrl: String;

    /**
     * Subject to invoke any table action
     */
    doTableAction: Subject<{ code: string; value: any }> = new Subject<{ code: string; value: any }>();

    /**
     * Текущая выделенная запись
     */
    private actualSelection: any;

    private static resolveUrl(searchUrl: string, context: any) {
        if (context === null || searchUrl === null) {
            return searchUrl;
        }
        const compiled = _.template(searchUrl);
        return compiled(context);
    }

    constructor(
        private informationService: DataTableInformationService,
        private eventManager: IadEventManager,
        private presentationHelper: PresentationHelper,
        private dataChainService: DataChainService,
        private dataPreviewChainService: ActualSelectionChainService
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
            this.selectionRequestField = IadHelper.getProperty(
                'selectionRequestField',
                this.selectionRequestField,
                this.projection.properties
            );
            this.initColumns();
            // #issue 1249 we must load actualInfo if it is not false in loadActualInfo input
            this.loadActualInfo = this.initLoadActualInformationFlag();
            this.groupSettingsKey = this.settingsGroupName(this.projection.code);
            this.unSelectRow.next(true);
            this.searchUrl = ProjectionTableComponent.resolveUrl(this.projection.searchUrl, this.context);
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
                this.showSearchPanel = false;
                this.showFilter = false;
            }
        };
        if (event.action.code in strategy) {
            strategy[event.action.code]();
        }
        this.actionClicked.emit(event);
        this.doTableAction.next({ code: event.action.code, value: event.action.active });
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

        // this.dataChainService.reset(this.type);

        this.removeSelectedDataFromPreview(this.actualSelection);
        this.actualSelection = undefined;
        this.unSelectedItem.emit();
        const event = new IadGridRowSelection({ action: SELECT_ACTION.UNSELECT, type: this.type });
        this.eventManager.broadcast(event);
    }

    /**
     * Init actual information flag;
     */
    initLoadActualInformationFlag() {
        return IadHelper.getProperty('loadActualInfo', true, this.projection);
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
                return of(<any>{
                    documentIndex: {},
                    documentDTO: {},
                    properties: {
                        className: this.presentationHelper.cleanProjectionCode(this.projection.code)
                    }
                });
            }
        };
        strategy[strategyName]().subscribe((response: any) => {
            if (response.documentDTO || response.documentIndex) {
                response.action = SELECT_ACTION.SELECT;
                response.selection = event;
                response.type = this.type;
                response.documentDTO = Object.assign({}, response.documentDTO, response.documentIndex);
                this.actualSelection = response;
                // this.dataChainService.add(this.type, this.actualSelection);
                this.sendSelectionToDataPreview(this.actualSelection);
                this.selectedItem.emit(this.actualSelection);
                this.eventManager.broadcast(new IadGridRowSelection(this.actualSelection));
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
                column.width = column.properties.width;
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
    }

    /**
     * Код для получения настроек проекции
     * @param projectionCode Код проекции
     */
    private settingsGroupName(projectionCode: string): string {
        return this.presentationCode + '.' + projectionCode;
    }

    /**
     * Отправляем событие, которое передаёт данные в компонент "Окно данные"
     * @param body
     */
    private sendSelectionToDataPreview(body: any): void {
        this.dataPreviewChainService.setData(body);
    }

    /**
     * Отправляем событие, которое убирает данные из компонента "Окно данные"
     * @param body
     */
    private removeSelectedDataFromPreview(body: any) {
        this.dataPreviewChainService.unsetData(body);
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
