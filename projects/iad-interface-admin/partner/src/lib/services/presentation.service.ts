import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IADPresentation } from '../model/projection.model';

export enum PRESENTATION_TYPE {
    ENTITY = 'ENTITY',
    RESOLUTION = 'RESOLUTION',
    PROFILE = 'PROFILE',
    COMPANY = 'COMPANY',
    HISTORY = 'HISTORY',
    DATA = 'DATA',
    COMMON = 'COMMON'
}

@Injectable({
    providedIn: 'root'
})
export class PresentationService {
    constructor(private http: HttpClient) {}
    find(presentationName: string, type: PRESENTATION_TYPE): Observable<IADPresentation> {
        if (presentationName) {
            const url = '/partnercms/api/iad/presentation/' + (type === PRESENTATION_TYPE.DATA ? 'data/' : '') + presentationName;
            return this.http.get<IADPresentation>(url, { observe: 'body' });
        } else {
            console.error('trying to load undefined presentation');
            return of(new IADPresentation());
        }
    }
}
