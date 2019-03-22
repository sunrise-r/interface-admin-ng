import { Injectable } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FloatingWindowEvent, onFloatingWindow } from 'app/layouts';
import { ActualSelectionModel } from '../data-table';
import { PdfViewComponent, DocumentPathComponent, ToolbarAction } from '../toolbar';
import { ENTITY_TYPE } from '../model/iad.models';
import { OperationRemoveComponent } from 'app/iad-framework/toolbar/operation-remove/operation-remove.component';

@Injectable()
export class ToolbarActionsCommonHandlerService {
    constructor(private modalService: NgbModal, private eventManager: JhiEventManager) {}

    handle(action: ToolbarAction, uid: string, selection: ActualSelectionModel, pathType: string) {
        if (action.code === 'path') {
            this.eventManager.broadcast(<FloatingWindowEvent>{
                name: onFloatingWindow,
                content: {
                    id: uid,
                    component: DocumentPathComponent,
                    componentData: {
                        selection,
                        pathType
                    }
                }
            });
        } else if (action.code === 'operationRemove') {
            this.eventManager.broadcast(<FloatingWindowEvent>{
                name: onFloatingWindow,
                content: {
                    id: uid,
                    component: OperationRemoveComponent,
                    componentData: {
                        selection
                    }
                }
            });
        } else if (
            [ENTITY_TYPE.DOCUMENT + 'Card', ENTITY_TYPE.OPERATION + 'Card', ENTITY_TYPE.RESOLUTION + 'Card'].indexOf(action.code) !== -1
        ) {
            const entityType = <ENTITY_TYPE>action.code.replace('Card', '');
            const modalRef = this.modalService.open(PdfViewComponent, { windowClass: 'pdf-view' });
            (<PdfViewComponent>modalRef.componentInstance).selection = selection;
            (<PdfViewComponent>modalRef.componentInstance).entityType = entityType;
            // modalRef.result.then();
        }
    }
}
