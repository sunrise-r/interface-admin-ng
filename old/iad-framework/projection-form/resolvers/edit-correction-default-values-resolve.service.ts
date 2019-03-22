import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActualSelectionModel } from 'app/iad-framework/data-table';
import { map } from 'rxjs/operators';
import { DocumentInfoBufferService } from '../services/document-info-buffer.service';

@Injectable({
    providedIn: 'root'
})
export class EditCorrectionDefaultValuesResolveService implements Resolve<any> {
    constructor(private documentInfoBufferService: DocumentInfoBufferService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const operationId = route.params['operationId'];
        return this.documentInfoBufferService.getEditInfo(operationId).pipe(
            map((editInfo: ActualSelectionModel) => {
                return {
                    document: editInfo.documentIndex,
                    id: parseInt(operationId, 10)
                };
            })
        );
    }
}
