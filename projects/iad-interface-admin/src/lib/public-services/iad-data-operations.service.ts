import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IadDataOperationsService {
  constructor(private http: HttpClient) {}

  saveData(postDataUrl: string, data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(postDataUrl, data, { observe: 'response' });
  }
}
