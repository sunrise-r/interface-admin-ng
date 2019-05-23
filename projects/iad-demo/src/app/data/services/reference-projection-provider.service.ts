import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IadFormProjectionInterface} from 'iad-interface-admin';
import {IadProjectionLoadService} from 'iad-interface-admin';
import {IadReferenceProjectionProviderService} from 'iad-interface-admin';

@Injectable({
  providedIn: 'root'
})
export class ReferenceProjectionProviderService implements IadReferenceProjectionProviderService {

  constructor(private iadProjectionLoadService: IadProjectionLoadService) { }

  findProjectionsByName(params: { [param: string]: string | string[] }): Observable<{ [param: string]: IadFormProjectionInterface }> {
    return this.iadProjectionLoadService.request(params, 'partnercms/api/iad/form-projection/form');
  }
}
