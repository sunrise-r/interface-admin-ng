import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { StringHelperService } from 'app/shared';
import { DocumentInfoBufferService } from '../services/document-info-buffer.service';
import { ActualSelectionModel } from 'app/iad-framework';

@Injectable({
    providedIn: 'root'
})
export class EditOperationDefaultValuesResolveService implements Resolve<any> {
    constructor(private documentInfoBufferService: DocumentInfoBufferService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const operationId = route.params['operationId'];
        const actionCode = route.params['actionCode'] ? StringHelperService.kebabToCamel(route.params['actionCode']) : null;
        return this.documentInfoBufferService.getEditInfo(operationId).pipe(
            map((editInfo: ActualSelectionModel) => {
                return {
                    document: editInfo.documentIndex,
                    type: actionCode,
                    id: parseInt(operationId, 10)
                };
            })
        );
    }
}
