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
      if (data[key] instanceof Object) {
        Object.assign(plainData, this.plainObject(data[key]));
      } else {
        plainData[key] = data[key];
      }
    });
    return plainData;
  }
}
