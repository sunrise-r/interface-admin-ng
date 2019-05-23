import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ActualSelectionModel} from '../models/actual-selection.model';
import {RequestParamsBuilder} from '../../shared/util/request-params-builder';
import {DATA_DEPENDENCY_LEVEL} from '../../model/projection.model';

type EntityArrayResponseType = HttpResponse<Array<any>>;

@Injectable({
    providedIn: 'root'
})
export class DataTableInformationService {
    constructor(private http: HttpClient) {}

    find(id: number, type: DATA_DEPENDENCY_LEVEL): Observable<ActualSelectionModel> {
        return type === DATA_DEPENDENCY_LEVEL.OPERATION
            ? this.http.get<ActualSelectionModel>(this.getFullUrl(`partnerdocuments/api/operations/info/${id}`), { observe: 'body' })
            : this.http.get<ActualSelectionModel>(this.getFullUrl(`partnerdocuments/api/document/actual/${id}`), { observe: 'body' });
    }

    search(searchUrl: string, req?: any, additional?: String): Observable<EntityArrayResponseType> {
        const options = RequestParamsBuilder.build(req);
        return this.http.get<Array<any>>(this.getFullUrl(searchUrl) + additional, {
            params: options,
            observe: 'response'
        });
    }

    private getFullUrl(url: string): string {
        return url;
    }
}
