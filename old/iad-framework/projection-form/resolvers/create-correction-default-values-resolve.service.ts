import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ActualSelectionModel } from 'app/iad-framework/data-table';
import { DATA_DEPENDENCY_LEVEL } from 'app/iad-framework';
import { map } from 'rxjs/operators';
import { DocumentInfoBufferService } from '../services/document-info-buffer.service';

@Injectable({
    providedIn: 'root'
})
export class CreateCorrectionDefaultValuesResolveService implements Resolve<any> {
    constructor(private documentInfoBufferService: DocumentInfoBufferService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const documentId = route.params['documentId'];
        return this.documentInfoBufferService.getCreateInfo(documentId, DATA_DEPENDENCY_LEVEL.DOCUMENT).pipe(
            map((editInfo: ActualSelectionModel) => {
                return {
                    document: editInfo.documentIndex
                };
            })
        );
    }
}
