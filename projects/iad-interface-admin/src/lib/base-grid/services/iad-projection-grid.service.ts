import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestParamsBuilder, IadConfigService } from 'iad-interface-admin/core';

type EntityArrayResponseType = HttpResponse<Array<any>>;

@Injectable({
    providedIn: 'root'
})
export class IadProjectionGridService {
    constructor(private http: HttpClient, private config: IadConfigService) {
    }

    search(searchUrl: string, req?: any): Observable<EntityArrayResponseType> {
        const options = RequestParamsBuilder.build(req);
        return this.http.get<Array<any>>(this.fromRoot(searchUrl), {params: options, observe: 'response'});
    }

    private fromRoot(url: string): string {
        return this.config.getConfig().rootUrl + url;
    }
}
