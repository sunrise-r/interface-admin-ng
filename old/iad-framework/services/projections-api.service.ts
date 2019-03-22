import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { DocumentFormProjection, DocumentListProjection } from '../';

@Injectable({
    providedIn: 'root'
})
export class ProjectionsApiService {
    constructor(private http: HttpClient) {}

    findProjectionsByName(input: { [param: string]: string | string[] }): Observable<{ [param: string]: DocumentFormProjection }> {
        const url = SERVER_API_URL + '/partnercms/api/iad/projections';
        const params: HttpParams = new HttpParams({ fromObject: input });
        return this.http.get<{ [param: string]: DocumentFormProjection }>(url, { observe: 'body', params });
    }

    /**
     * Сервис посылает на partnerCms запрос, в качестве параметров массив названий индексов
     * для которых нужно получить проекции просмотра данных. Сервер отвечает клиенту списком,
     * ключ — значение, где ключ это название индекса, а значение данные проекции.
     * GET /partnercms/api/iad/references/projections?indexes=v1,v2,v3...vN
     * @param indices
     */
    findProjectionsByIndexName(indices: string[]): Observable<HttpResponse<{ [param: string]: DocumentListProjection }>> {
        if (indices.length === 0) {
            return of(new HttpResponse<{ [param: string]: DocumentListProjection }>());
        }
        const url = SERVER_API_URL + '/partnercms/api/iad/references/projections';
        const params: HttpParams = new HttpParams({
            fromObject: {
                indexes: indices.join(',')
            }
        });
        return this.http.get<{ [param: string]: DocumentListProjection }>(url, { observe: 'response', params });
    }

    /**
     * load FORM projection by operation type or return 404
     * @param operationType
     */
    findProjectionByOperationType(operationType): Observable<HttpResponse<DocumentFormProjection>> {
        const url = SERVER_API_URL + '/partnercms/api/iad/projections/by-correction';
        const params: HttpParams = new HttpParams({
            fromObject: {
                type: operationType
            }
        });
        return this.http.get<DocumentFormProjection>(url, { observe: 'response', params });
    }
}
