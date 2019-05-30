import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IadDataOperationsService {
  constructor(private http: HttpClient) {}

  saveData(postDataUrl: string, data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(postDataUrl, this.plainObject(data), { observe: 'response' });
  }

  plainObject(data: any): any {
    const plainData = {};
    Object.keys(data).forEach(key => {
      if (data[key] instanceof Date) {
        plainData[key] = this.toISOStringWithTimezone(data[key]);
      } else if (data[key] instanceof Object && !(data[key] instanceof Array)) {
        Object.assign(plainData, this.plainObject(data[key]));
      } else {
        plainData[key] = data[key];
      }
    });
    return plainData;
  }

  toISOStringWithTimezone(date: Date) {
    const tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
  }
}
