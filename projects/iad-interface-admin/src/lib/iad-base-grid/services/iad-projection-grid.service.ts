import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestParamsBuilder, IadConfigService } from 'iad-interface-admin/core';

type EntityArrayResponseType = HttpResponse<Array<any>>;

@Injectable({
    providedIn: 'root'
})
export class IadProjectionGridService {
    constructor(private http: HttpClient, private config: IadConfigService) {
    }

    /**
     * @Todo It would be better to use native angular HttpParams instead of queryAddon
     * @param searchUrl
     * @param queryAddon
     * @param req
     */
    search(searchUrl: string, queryAddon: string, req?: any): Observable<EntityArrayResponseType> {
        const options = RequestParamsBuilder.build(req);
        const queryAddonOptions = new HttpParams({fromString: queryAddon});
        const params = RequestParamsBuilder.merge(options, queryAddonOptions);
        return this.http.get<Array<any>>(this.fromRoot(searchUrl), {params: params, observe: 'response'});
    }

    private fromRoot(url: string): string {
        return this.config.getConfig().rootUrl + url;
    }
}
