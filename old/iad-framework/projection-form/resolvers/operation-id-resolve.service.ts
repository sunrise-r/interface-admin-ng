import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class OperationIdResolveService implements Resolve<string> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
        return route.params['operationId'];
    }
}
