import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {StringHelper} from 'iad-interface-admin';

@Injectable({
  providedIn: 'root'
})
export class ProjectionNameResolverService implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
    const projectionCode = route.params['projectionCode'];
    return StringHelper.kebabToCamel(projectionCode);
  }

}