import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IadEventManager } from 'iad-interface-admin/core';
import { CustomizeQuery } from 'iad-interface-admin/filter';

import {
    IadGridColumn,
    FILTER_TYPE,
    IadGridConfigModel,
    CmsSetting,
    IadGridConfigProvider
} from 'iad-interface-admin';

import { GridConfigService } from './grid-config.service';
import {CmsUserSettingsLoaderService, EntityResponseType} from './iad-user-settings-loader.service';

@Component({
    selector: 'iad-settings-table',
    templateUrl: './iad-settings-table.component.html',
    providers: [GridConfigService]
})
export class IADSettingsTableComponent implements OnChanges, OnInit, IadGridConfigProvider, OnDestroy {
    /**
     * Нажата какая-либо кнопка в тулбаре
     */
    @Input() doTableAction: Subject<{ code: string; value: any }>;

    /**
     * Флаг "Разрешить снятие выделения"
     */
    @Input() allowUnSelectRow: boolean;

    /**
     * Видимые колонки таблицы
     */
    @Input()
    set columns(columns: IadGridColumn[]) {
        if (columns) {
            this.config.columns = columns;
        }
    }

    /**
     * Поле для сортировки по умолчанию
     */
    @Input() defaultSortField = 'id';

    /**
     * String filter builder type.
     */
    @Input() filterType: string;

    /**
     * Название группы настроек. Будет использованная при сохранении настроек на стороне сервера.
     */
    @Input() groupSettingsKey: string;

    /**
     * Внешние данные для таблицы
     */
    @Input() items: any[] = [];

    /**
     * Включает Lazy Loading если есть URL ресурса
     */
    @Input() lazyLoadingEnabled: boolean;

    /**
     * Адресс ресурса - источника данных
     */
    @Input() searchUrl: string;

    /**
     * Коллбэк в ктором можено указать дополнительные параметры для построения query
     */
    @Input() filter: CustomizeQuery;

    /**
     * Обновляет данные таблицы
     */
    @Input() refresh: Subject<any> = new Subject<any>();

    /**
     * Посылает событие сброса фильтра
     */
    @Input() resetFilter: Subject<FILTER_TYPE> = new Subject<FILTER_TYPE>();

    /**
     * сабжект снятия выделения
     */
    @Input() unSelectRow: Subject<boolean> = new Subject<boolean>();

    /**
     * Список "статически замороженных колонок"
     */
    @Input() staticFrozenColumns: IadGridColumn[] = [];

    /**
     * #1226 Subject to notify table about height change
     */
    @Input() changeTableHeight: Subject<boolean> = new Subject<boolean>();

    /**
     * Updates settings inside projection-table
     */
    @Input() settingsUpdater: Subject<any> = new Subject<any>();

    /**
     * Flag to check if grid filter should be shown by default
     */
    @Input() showFilter: boolean;

    /**
     * Список "статически замороженных справа колонок"
     */
    @Input() staticFrozenRightColumns: IadGridColumn[] = [];

    /**
     * Размер области "статически замороженных справа колонок
     */
    @Input() staticFrozenRightWidth = '0';

    /**
     * Размер области "статически замороженных колонок"
     */
    @Input() staticFrozenWidth = '0';

    /**
     * В таблице была выбрна строка
     */
    @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

    /**
     * В таблице было снято выделение строки
     */
    @Output() unSelectedItem: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Модель конйфига для таблицы
     */
    config: IadGridConfigModel = new IadGridConfigModel();

    /**
     * Предыдущее значение сортировки
     */
    initialSort: string;

    /**
     * Данные таблицы были изменены
     * Передаёт в data-table.component информацию обо всех текущих настройках в виде единого IadGridConfigModel файла
     * Это позволяет исключить установку сортировки до обработки запроса на обновление данных без
     * необходимости устанавливать таймауты
     */
    refreshConfig: Subject<IadGridConfigModel> = new Subject<IadGridConfigModel>();

    /**
     * Изменение размеров таблицы
     */
    updateVisibility: Subject<IadGridColumn> = new Subject<IadGridColumn>();

    /**
     * Currently selected item
     */
    selection: any;

    private settingUpdateSbt: Subscription;

    private refreshSbt: Subscription;

    constructor(
        private settingsLoader: CmsUserSettingsLoaderService,
        private eventManager: IadEventManager,
        private gridConfigService: GridConfigService
    ) {}

    ngOnInit(): void {
        // Подписка на refresh настроек
        this.refreshSbt = this.refresh.subscribe(() => {
            if (!this.config) {
                this.initSettings(this.groupSettingsKey);
            } else {
                this.refreshConfig.next(this.config);
            }
        });

        this.settingUpdateSbt = this.settingsUpdater.subscribe(event => {
            if (event.name === 'columns') {
                this.onUpdateColumnsVisibility(event.content.columns, event.content.prevEvent);
            }
        });

        // #1570 ЗАкомментировалим чтобы убрать тройной запрос
        // Обновление данных при смене аккаунта
        // this.onAccountChangeSbt = this.eventManager.subscribe(onAccountChange, event => this.refreshConfig.next(this.config));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('groupSettingsKey' in changes && this.groupSettingsKey) {
            this.initSettings(this.groupSettingsKey);
        }
        // issue #1792 Перенёс это из data-table.component:
        // issue #1745 поправил работу фильтра по проекциям
        if ('filter' in changes) {
            this.config.filter = this.filter;
            this.refreshConfig.next(this.config);
        }
    }

    ngOnDestroy(): void {
        if (this.refreshSbt) {
            this.refreshSbt.unsubscribe();
        }
        if (this.settingUpdateSbt) {
            this.settingUpdateSbt.unsubscribe();
        }
    }

    /**
     * Обработчик смены настроек, если они были изменены с помощью контролов таблицы
     * @param data
     */
    onSettingChanged(data: CmsSetting) {
        this.sendSettingsToServer(this.groupSettingsKey, data.name, data.value);
    }

    /**
     * Бросает событие "Строка выбрана в таблице"
     * @param event
     */
    onSelectionChange(event) {
        if (event) {
            this.selection = event;
            this.selectedItem.next(event);
        } else {
            this.selection = event;
            this.unSelectedItem.next(event);
        }
    }

    /**
     * Обновляет настройки проекции на backend
     * @param name
     * @param value
     * @param groupName
     * @returns Subscription
     */
    sendSettingsToServer(groupName: string, name: string, value: any): Promise<EntityResponseType> {
        const strValue = typeof value === 'string' ? value : JSON.stringify(value);
        if ((name === 'sort' && strValue === this.initialSort) || name === 'filter') {
            return;
        }
        return this.settingsLoader
            .updateSettings({
                groupName,
                key: name,
                value: strValue
            })
            .toPromise();
    }

    /**
     * Updates columns visibility property
     * @param columns
     * @param actedColumn
     */
    onUpdateColumnsVisibility(columns: IadGridColumn[], actedColumn: IadGridColumn) {
        const visibility: { [prop: string]: boolean } = {};
        columns.forEach((column: IadGridColumn) => {
            visibility[column.field] = column.visible;
        });
        this.updateVisibility.next(actedColumn);
        const settings = new CmsSetting('dgColumnVisibility', visibility);
        this.onSettingChanged(settings);
    }

    /**
     * Инициализирует настройки
     * @param groupSettingsKey
     */
    private initSettings(groupSettingsKey: string) {
        this.loadSettings(groupSettingsKey).then((prefs: Map<string, string>) => {
            this.config = this.gridConfigService.populate(this.config.columns, prefs);
            this.initialSort = this.config.sortField + ',' + (this.config.sortOrder < 0 ? 'desc' : 'asc');
            this.refreshConfig.next(this.config);
        });
    }

    /**
     * Загрузка настроек с бекенда
     * @param groupSettingsKey
     */
    private loadSettings(groupSettingsKey: string): Promise<Map<string, string>> {
        return this.settingsLoader
            .getSettingsByGroup(groupSettingsKey)
            .toPromise()
            .then(response => {
                const prefs = new Map<string, string>();
                response.body.forEach(st => {
                    prefs.set(st.key, st.value);
                });
                return Promise.resolve(prefs);
            });
    }
}
