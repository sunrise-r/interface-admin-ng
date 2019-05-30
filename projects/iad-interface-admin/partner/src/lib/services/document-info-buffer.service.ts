import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DocumentOperationsService } from './document-operations.service';

import {DataTableInformationService} from '../data-table/services/data-table-information.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentInfoBufferService {
    infoBuffer: any;
    infoId: any;

    $stream: Observable<any>;

    constructor(private informationService: DataTableInformationService, private operationsService: DocumentOperationsService) {}

    getEditInfo(operationId: number) {
        if (operationId !== this.infoId || !this.$stream) {
            this.$stream = this.operationsService.loadEditInfo(operationId).pipe(share());
            this.infoId = operationId;
        }
        return this.$stream;
    }

    getCreateInfo(documentId: number, type: string) {
        if (documentId !== this.infoId || !this.$stream) {
            this.$stream = this.informationService.find(documentId, type).pipe(share());
            this.infoId = documentId;
        }
        return this.$stream;
    }

    clear() {
        this.infoBuffer = null;
        this.infoId = null;
    }
}
