import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DocumentInfoBufferService } from '../services/document-info-buffer.service';

@Injectable({
    providedIn: 'root'
})
export class EditRawInformationResolveService implements Resolve<any> {
    constructor(private documentInfoBufferService: DocumentInfoBufferService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const operationId = route.params['operationId'];
        return this.documentInfoBufferService.getEditInfo(operationId);
    }
}
