import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

import { IOperation } from 'app/customize/document-resolutions/operation.model';
import { DATA_DEPENDENCY_LEVEL } from '../../';

@Injectable({
    providedIn: 'root'
})
export class DocumentPathLoadService {
    constructor(private http: HttpClient) {}

    /**
     * Запрос операций по документу для вынесения резолюции
     * @param id
     * @param type
     */
    load(id: number, type: DATA_DEPENDENCY_LEVEL = DATA_DEPENDENCY_LEVEL.DOCUMENT): Observable<HttpResponse<IOperation[] | IOperation>> {
        return this.http.get<IOperation[] | IOperation>(SERVER_API_URL + `/partnerdocuments/api/history/${type}/${id}`, {
            observe: 'response'
        });
    }
}
