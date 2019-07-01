import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GridSettingsStorageInterface, UserSettingInputDTO } from './grid-settings-storage.interface';

@Injectable({
    providedIn: 'root'
})
export class GridSettingsStorageService implements GridSettingsStorageInterface {
    constructor(private http: HttpClient) {}

    getSettings(groupName: string): Observable<UserSettingInputDTO[]> {
        return this.http.get<UserSettingInputDTO[]>('/partnercms/api/user-setting/current/' + groupName, { observe: 'body' });
    }

    saveSettings(data: UserSettingInputDTO): void {
        this.http.post<UserSettingInputDTO>('/partnercms/api/user-setting/update/', data, { observe: 'body' })
            .toPromise()
            .catch(error => console.error(error));
    }
}
