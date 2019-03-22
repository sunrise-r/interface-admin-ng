import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringHelperService } from 'app/shared';
import { DocumentFormProjection, PresentationLoader, IADPresentation, PRESENTATION_TYPE } from '../../';

@Injectable({
    providedIn: 'root'
})
export class FormProjectionResolveService implements Resolve<DocumentFormProjection> {
    constructor(private presentationLoader: PresentationLoader) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentFormProjection> {
        const documentType = route.params['documentType'] ? StringHelperService.kebabToCamel(route.params['documentType'], true) : null;
        const className = route.params['className'] ? StringHelperService.kebabToCamel(route.params['className'], false) : null;

        if (documentType) {
            return this.presentationLoader.load(documentType, PRESENTATION_TYPE.ENTITY).pipe(
                map((presentation: IADPresentation) => {
                    const formProjection = presentation.formProjections.find(
                        (projection: DocumentFormProjection) => projection.code.toLowerCase() === className.toLowerCase()
                    );
                    if (!formProjection) {
                        console.error('Form projection resolver cannot resolve projection with code ' + className);
                    }
                    return formProjection;
                })
            );
        }
        return of(new DocumentFormProjection());
    }
}
