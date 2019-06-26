import { Observable } from 'rxjs';

export interface UserSettingInputDTO {
    groupName: string;
    key: string;
    value: string;
}

export interface GridSettingsStorageInterface {
    getSettings(groupName: string): Observable<UserSettingInputDTO[]>;
    saveSettings(data: UserSettingInputDTO): void;
}
