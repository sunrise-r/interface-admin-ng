import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IadConfigService} from 'iad-interface-admin/core';

@Injectable({
  providedIn: 'root'
})
export class IadFieldValuesService {
  constructor(private http: HttpClient, private config: IadConfigService) {}

  retrieveFieldMap(fieldValueUrl: string): Observable<any> {
    return this.http.get(this.fromRoot(fieldValueUrl));
  }

  private fromRoot(url: string): string {
    return this.config.getConfig().rootUrl + url;
  }
}
