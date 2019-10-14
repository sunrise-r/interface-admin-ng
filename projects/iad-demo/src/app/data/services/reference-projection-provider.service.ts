import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IadFormProjectionInterface, IadReferenceProjectionProviderInterface } from 'iad-interface-admin/form';
import { IadProjectionLoadService } from './iad-projection-load.service';

@Injectable({
    providedIn: 'root'
})
export class ReferenceProjectionProviderService implements IadReferenceProjectionProviderInterface {

    constructor(private iadProjectionLoadService: IadProjectionLoadService) {}

    findFormProjectionsByName(params: { [param: string]: string | string[] }): Observable<{ [param: string]: IadFormProjectionInterface }> {
        return this.iadProjectionLoadService.request(params, 'iad/form-projection/form');
    }
}
