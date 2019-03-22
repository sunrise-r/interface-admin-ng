import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { StringHelperService } from 'app/shared';

@Injectable({
    providedIn: 'root'
})
export class OperationActionResolveService implements Resolve<string> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
        return route.params['actionCode'] ? StringHelperService.kebabToCamel(route.params['actionCode']) : null;
    }
}
