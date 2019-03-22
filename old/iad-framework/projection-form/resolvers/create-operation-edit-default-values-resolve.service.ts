import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActualSelectionModel } from '../../data-table';
import { DATA_DEPENDENCY_LEVEL } from 'app/iad-framework';
import { DocumentInfoBufferService } from '../services/document-info-buffer.service';

@Injectable({
    providedIn: 'root'
})
export class CreateOperationEditDefaultValuesResolveService implements Resolve<any> {
    constructor(private documentInfoBufferService: DocumentInfoBufferService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const documentId = route.params['documentId'];
        return this.documentInfoBufferService.getCreateInfo(documentId, DATA_DEPENDENCY_LEVEL.DOCUMENT).pipe(
            map((editInfo: ActualSelectionModel) => {
                return Object.assign({}, editInfo.documentDTO, editInfo.documentIndex, editInfo.selection, editInfo.properties);
            })
        );
    }
}
