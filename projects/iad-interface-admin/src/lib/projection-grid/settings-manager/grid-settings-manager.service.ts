import { Inject, Injectable } from '@angular/core';
import { GridSettingsManagerInterface } from './grid-settings-manager.interface';
import { SETTINGS_KEEPER } from './grid-settings-storage.service';
import { GridSettingsPopulatorService } from './grid-settings-populator.service';
import { Subject } from 'rxjs';
import { IadGridConfigInterface, IadGridConfigModel } from '../../iad-base-grid/model/iad-grid-model';
import { IadGridColumn } from '../../iad-base-grid/model/iad-grid-column.model';
import { CmsSetting } from '../../iad-base-grid/base-grid/cms-setting';
import { GridSettingsStorageInterface } from './grid-settings-storage.interface';

@Injectable()
export class GridSettingsManagerService implements GridSettingsManagerInterface {

    /**
     * Предыдущее значение сортировки
     */
    initialSort: string;

    /**
     * Модель конфига для таблицы
     */
    config: IadGridConfigModel;

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

    private groupSettingsKey: string;

    constructor(
        @Inject(SETTINGS_KEEPER) private settingsKeeper: GridSettingsStorageInterface,
        private gridConfigService: GridSettingsPopulatorService
    ) {
        this.reset();
    }

    /**
     * Set config as empty grid config
     */
    reset(): void {
        this.config = new IadGridConfigModel();
    }

    /**
     * Refresh grid config with current config values
     */
    refresh(): void {
        if (!this.config.dirty) {
            this.initSettings(this.groupSettingsKey);
        } else {
            this.refreshGridConfig.next(this.config);
        }
    }

    /**
     * Allow to set group settings key and reinit settings
     * @param groupSettingsKey
     * @param reset
     */
    setGroupSettingsKey(groupSettingsKey: string, reset?: boolean): void {
        this.groupSettingsKey = groupSettingsKey;
        if (reset !== false) {
            this.reset();
            this.refresh();
        }
    }

    /**
     * Allow to set external config to existing config and refresh the table
     * @param config
     * @param refresh
     */
    setExternalGridConfig(config: IadGridConfigInterface, refresh?: boolean): void {
        this.config.merge(config);
        this.setGroupSettingsKey(this.config.gridId, false);
        if (refresh) {
            this.refresh();
        }
    }

    /**
     * Обработчик смены настроек, если они были изменены с помощью контролов таблицы
     * @param data
     */
    saveSettings(data: CmsSetting): void {
        const groupName = this.groupSettingsKey;
        const name = data.name;
        const value = data.value;
        const strValue = typeof value === 'string' ? value : JSON.stringify(value);
        if ((name === 'sort' && strValue === this.initialSort) || name === 'filter') {
            return;
        }
        this.settingsKeeper.saveSettings(groupName, {key: name, value: strValue});
    }

    /**
     * Updates columns visibility property
     * @param columns
     * @param actedColumn
     */
    updateColumnsVisibility(columns: IadGridColumn[], actedColumn: IadGridColumn) {
        const visibility: { [prop: string]: boolean } = {};
        columns.forEach((column: IadGridColumn) => {
            visibility[column.field] = column.visible;
        });
        this.updateVisibility.next(actedColumn);
        const settings = new CmsSetting('dgColumnVisibility', visibility);
        this.saveSettings(settings);
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
        return this.settingsKeeper
            .getSettings(groupSettingsKey)
            .then(settings => Promise.resolve(settings.reduce((acu, group) => {
                acu.set(group.key, group.value);
                return acu;
            }, new Map<string, string>())));
    }
}
