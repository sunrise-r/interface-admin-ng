import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DocumentFormProjection, ProjectionsApiService } from '../../';

@Injectable({
    providedIn: 'root'
})
export class FormProjectionEditCorrectionResolveService implements Resolve<DocumentFormProjection> {
    constructor(private projectionsApiService: ProjectionsApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentFormProjection> {
        const operationType = route.params['operationType'];
        return this.projectionsApiService.findProjectionByOperationType(operationType).pipe(
            map(response => {
                return response.body;
            }),
            catchError(err => of(new DocumentFormProjection()))
        );
    }
}
