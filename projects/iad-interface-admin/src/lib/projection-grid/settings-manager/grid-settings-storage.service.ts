import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { GridSettingsStorageInterface, UserSettingInputDTO } from './grid-settings-storage.interface';

export const SETTINGS_KEEPER = new InjectionToken<GridSettingsStorageInterface>('SETTINGS_KEEPER');

@Injectable({
    providedIn: 'root'
})
export class GridSettingsStorageService implements GridSettingsStorageInterface {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

    getSettings(groupName: string): Promise<UserSettingInputDTO[]> {
        const settings = this.storage.get(groupName);
        let result: UserSettingInputDTO[];
        try {
            result = JSON.parse(settings);
        } catch (e) {
            result = [];
        }
        return Promise.resolve(result);
    }

    saveSettings(groupName: string, data: UserSettingInputDTO): void {
        this.getSettings(groupName)
            .then(settings => {
                settings[data.key] = typeof data.value === 'string' ? data.value : JSON.stringify(data.value);
                this.storage.set(groupName, JSON.stringify(settings));
            })
            .catch(error => console.error(error));
    }
}
