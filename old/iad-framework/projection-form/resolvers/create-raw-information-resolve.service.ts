import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DocumentInfoBufferService } from '../services/document-info-buffer.service';
import { DATA_DEPENDENCY_LEVEL } from '../../model/projection.model';

@Injectable({
    providedIn: 'root'
})
export class CreateRawInformationResolveService implements Resolve<any> {
    constructor(private documentInfoBufferService: DocumentInfoBufferService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const documentId = route.params['documentId'];
        return this.documentInfoBufferService.getCreateInfo(documentId, DATA_DEPENDENCY_LEVEL.DOCUMENT);
    }
}
