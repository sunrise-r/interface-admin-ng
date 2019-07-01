import { Subject } from 'rxjs';
import { IadGridConfigModel, CmsSetting } from 'iad-interface-admin';

export interface GridSettingsManagerInterface {
    /**
     * Данные таблицы были изменены
     * Передаёт в data-table.component информацию обо всех текущих настройках в виде единого DatatableConfigModel файла
     * Это позволяет исключить установку сортировки до обработки запроса на обновление данных без
     * необходимости устанавливать таймауты
     */
    refreshGridConfig: Subject<IadGridConfigModel>;

    /**
     * Модель конфига для таблицы
     */
    config: IadGridConfigModel;

    reset(): void;
    refresh(): void;
    setGroupSettingsKey(groupSettingsKey: string): void;
    setExternalGridConfig(config: IadGridConfigModel, refresh?: boolean): void;
    saveSettings(data: CmsSetting): void;
}
