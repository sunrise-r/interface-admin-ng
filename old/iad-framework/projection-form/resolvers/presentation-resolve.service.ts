import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { StringHelperService } from 'app/shared';
import { PresentationLoader, IADPresentation, PRESENTATION_TYPE } from '../../';

@Injectable({
    providedIn: 'root'
})
export class PresentationResolveService implements Resolve<IADPresentation> {
    constructor(private presentationLoader: PresentationLoader) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IADPresentation> {
        const documentType = route.params['documentType'] ? StringHelperService.kebabToCamel(route.params['documentType'], true) : null;
        if (documentType) {
            return this.presentationLoader.load(documentType, PRESENTATION_TYPE.ENTITY);
        }
        return of(new IADPresentation());
    }
}
