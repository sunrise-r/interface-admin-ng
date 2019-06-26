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
     * Видимые колонки таблицы
     */
    @Input()
    set columns(columns: IadGridColumn[]) {
        if (columns) {
            this.config.columns = columns;
        }
    }

    /**
     * Коллбэк в ктором можено указать дополнительные параметры для построения query
     */
    @Input() filter: CustomizeQuery;

    /**
     * Обновляет данные таблицы
     */
    @Input() refresh: Subject<any> = new Subject<any>();

    /**
     * Updates settings inside projection-table
     */
    @Input() settingsUpdater: Subject<any> = new Subject<any>();

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
    refreshGridConfig: Subject<IadGridConfigModel> = new Subject<IadGridConfigModel>();

    /**
     * Изменение размеров таблицы
     */
    updateVisibility: Subject<IadGridColumn> = new Subject<IadGridColumn>();

    constructor(
        private settingsLoader: CmsUserSettingsLoaderService,
        private eventManager: IadEventManager,
        private gridConfigService: GridConfigService
    ) {}

    ngOnInit(): void {





    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('groupSettingsKey' in changes && this.groupSettingsKey) {
            this.initSettings(this.groupSettingsKey);
        }
        // issue #1792 Перенёс это из data-table.component:
        // issue #1745 поправил работу фильтра по проекциям
        if ('filter' in changes) {
            this.config.filter = this.filter;
            this.refreshGridConfig.next(this.config);
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
            // calls first grid update
            this.refreshGridConfig.next(this.config);
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
