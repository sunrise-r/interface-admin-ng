import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RawDataResolverService implements Resolve<{[param: string]: any}> {

  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{[param: string]: any}> | Promise<{[param: string]: any}> {
    return this.http.get<any>(route.data.apiPath + route.params.id, { observe: 'body' });
  }
}
