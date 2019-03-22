import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActualSelectionModel } from '../../data-table';
import { DocumentInfoBufferService } from '../services/document-info-buffer.service';

@Injectable({
    providedIn: 'root'
})
export class EditOperationNewDefaultValuesResolveService implements Resolve<any> {
    constructor(private documentInfoBufferService: DocumentInfoBufferService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const operationId = route.params['operationId'];
        return this.documentInfoBufferService.getEditInfo(operationId).pipe(
            map((editInfo: ActualSelectionModel) => {
                return Object.assign({}, editInfo.documentDTO, editInfo.documentIndex, editInfo.selection, editInfo.properties);
            })
        );
    }
}
