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

import { ToolbarAction, IadGridColumn, FILTER_TYPE, IadGridColumnInterface, IadGridConfigModel, IadGridConfigInterface, DocumentListProjection } from 'iad-interface-admin';
import { IadHelper } from 'iad-interface-admin/core';

import { GridSettingsManagerService } from '../settings-manager/grid-settings-manager.service';

@Component({
    selector: 'iad-projection-table',
    templateUrl: './projection-table.component.html',
    providers: [GridSettingsManagerService]
})
export class ProjectionTableComponent implements OnInit, OnChanges, AfterContentInit {
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


            this.gridSettingsManager.setExternalGridConfig(<IadGridConfigInterface>{
                gridId: this.gridId,
                columns: this.initColumns(),
                filter: this.filter,
                searchUrl: this.searchUrl
            }, true);
        }
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
}
