import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as momentImported from 'moment'; const moment = momentImported;

@Injectable({
  providedIn: 'root'
})
export class IadDataOperationsService {
  constructor(private http: HttpClient) {}

  saveData(postDataUrl: string, data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(postDataUrl, data, { observe: 'response' });
  }

  formatDateTime(data: any): any {
      Object.keys(data).forEach(key => {
          if (data[key] instanceof Date) {
              data[key] = moment(data[key]).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
          } else if (data[key] instanceof Object && !(data[key] instanceof Array)) {
              data[key] = this.formatDateTime(data[key]);
          } else {
              data[key] = data[key];
          }
      });
      return data;
  }
}
