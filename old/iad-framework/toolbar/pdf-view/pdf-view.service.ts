import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ENTITY_TYPE } from '../../model/iad.models';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable()
export class PdfViewService {
    constructor(private http: HttpClient) {}

    /**
     * Requests PDF Card information
     * @param id
     * @param type
     */
    card(id: number, type: ENTITY_TYPE): Observable<any> {
        const url = `/partnerdocuments/api/${type}-card/${id}`;
        return this.http.get(this.getFullUrl(url), { responseType: 'blob' });
    }

    private getFullUrl(url: string): string {
        return SERVER_API_URL + url;
    }
}
