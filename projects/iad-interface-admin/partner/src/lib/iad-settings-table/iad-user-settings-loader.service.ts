import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserSettingInputDTO {
  groupName: string;
  key: string;
  value: string;
}

export type EntitiesResponseType = HttpResponse<UserSettingInputDTO[]>;
export type EntityResponseType = HttpResponse<UserSettingInputDTO>;

@Injectable({
    providedIn: 'root'
})
export class CmsUserSettingsLoaderService {
    resourceUrl = '/partnercms/api/user-setting';

    constructor(private http: HttpClient) {}

    getSettingsByGroup(groupName: string): Observable<EntitiesResponseType> {
        return this.http.get<UserSettingInputDTO[]>(this.resourceUrl + '/current/' + groupName, { observe: 'response' });
    }

    updateSettings(userSetting: UserSettingInputDTO): Observable<EntityResponseType> {
        return this.http.post<UserSettingInputDTO>(this.resourceUrl + '/update/', userSetting, { observe: 'response' });
    }
}
