import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OperationRemoveService {
    constructor(private http: HttpClient) {}

    remove(id: number): any {
        return this.http.delete<any>(SERVER_API_URL + '/partnerprocess/api/bp/operation/' + id, {
            observe: 'response'
        });
    }
}
