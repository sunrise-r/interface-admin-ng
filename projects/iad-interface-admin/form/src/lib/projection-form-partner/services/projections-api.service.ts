import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {IadFormProjection} from '../../projection-form/model/iad-form-projection.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectionsApiService {
    constructor(private http: HttpClient) {}

    findProjectionsByName(input: { [param: string]: string | string[] }): Observable<{ [param: string]: IadFormProjection }> {
        const url = '/partnercms/api/iad/projections';
        const params: HttpParams = new HttpParams({ fromObject: input });
        return this.http.get<{ [param: string]: IadFormProjection }>(url, { observe: 'body', params });
    }

    /**
     * load FORM projection by operation type or return 404
     * @param operationType
     */
    findProjectionByOperationType(operationType): Observable<HttpResponse<IadFormProjection>> {
        const url = '/partnercms/api/iad/projections/by-correction';
        const params: HttpParams = new HttpParams({
            fromObject: {
                type: operationType
            }
        });
        return this.http.get<IadFormProjection>(url, { observe: 'response', params });
    }
}
