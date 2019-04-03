import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IadDataOperationsService {
  constructor(private http: HttpClient, private router: Router) {}

  saveData(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.router.url, data, { observe: 'response' });
  }
}
