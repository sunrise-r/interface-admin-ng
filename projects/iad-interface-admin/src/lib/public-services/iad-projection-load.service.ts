import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IadConfigService} from 'iad-interface-admin/core';
import {IadFormProjection, IadFormProjectionInterface} from 'iad-interface-admin/form';

@Injectable({
  providedIn: 'root'
})
export class IadProjectionLoadService {

  constructor(private http: HttpClient, private config: IadConfigService) { }

  request(params: { [param: string]: string | string[] }, url): Observable<{ [param: string]: IadFormProjectionInterface }> {
    return this.http.get<{ [param: string]: IadFormProjectionInterface }>(url, { observe: 'body', params });
  }

  private fromRoot(url: string): string {
    return this.config.getConfig().rootUrl + url;
  }
}
