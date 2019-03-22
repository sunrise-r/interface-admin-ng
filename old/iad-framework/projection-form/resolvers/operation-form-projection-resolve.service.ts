import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StringHelperService } from 'app/shared';
import { DocumentFormProjection, PresentationLoader, IADPresentation } from 'app/iad-framework';

@Injectable({
    providedIn: 'root'
})
export class OperationFormProjectionResolveService implements Resolve<DocumentFormProjection> {
    constructor(private presentationService: PresentationLoader) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentFormProjection> {
        const actionCode = route.params['actionCode'] ? StringHelperService.kebabToCamel(route.params['actionCode']) : null;

        return this.presentationService.loadCommonPresentation().pipe(
            map((presentation: IADPresentation) => {
                return presentation.formProjections.find((projection: DocumentFormProjection) => projection.code === actionCode);
            })
        );
    }
}
