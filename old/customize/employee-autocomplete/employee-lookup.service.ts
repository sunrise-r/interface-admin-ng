import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared';

@Injectable()
export class EmployeeLookupService {
    constructor(private http: HttpClient) {}

    search(query): Observable<HttpResponse<any>> {
        const options = createRequestOption(query);
        return this.http.get<any>(SERVER_API_URL + 'partnerdocuments/api/_search/employees-for-approving', {
            params: options,
            observe: 'response'
        });
        // return this.http.get<any>(SERVER_API_URL + 'partnerdocuments/api/_search/employees', { params: options, observe: 'response' });
    }
}
