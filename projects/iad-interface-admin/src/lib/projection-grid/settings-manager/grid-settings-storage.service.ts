import { Inject, Injectable, InjectionToken } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { IadHelper } from 'iad-interface-admin/core';
import {
    GridSettingsStorageInterface,
    UserGetSettingsInterface
} from './grid-settings-storage.model';

export const SETTINGS_KEEPER = new InjectionToken<GridSettingsStorageInterface>('SETTINGS_KEEPER');

@Injectable({
    providedIn: 'root'
})
export class GridSettingsStorageService implements GridSettingsStorageInterface {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

    getSettings(groupName: string): Promise<UserGetSettingsInterface[]> {
        const settings = this.storage.get(groupName);
        let result: UserGetSettingsInterface[];
        try {
            result = JSON.parse(settings);
        } catch (e) {
            result = [];
        }
        return Promise.resolve(result);
    }

    saveSettings(groupName: string, data: UserGetSettingsInterface): void {
        this.getSettings(groupName)
            .then(settings => {
                IadHelper.splice(settings, data, 'key');
                this.storage.set(groupName, JSON.stringify(settings));
            })
            .catch(error => console.error(error));
    }
}
