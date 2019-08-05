import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IadFormProjectionInterface } from 'iad-interface-admin/form';

@Injectable({
    providedIn: 'root'
})
export class IadProjectionLoadService {

    constructor(private http: HttpClient) {}

    request(params: { [param: string]: string | string[] }, url): Observable<{ [param: string]: IadFormProjectionInterface }> {
        return this.http.get<{ [param: string]: IadFormProjectionInterface }>(url, {observe: 'body', params});
    }
}
