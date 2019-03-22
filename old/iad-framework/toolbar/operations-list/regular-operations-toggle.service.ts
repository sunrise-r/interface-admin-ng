import { Injectable } from '@angular/core';
import { ActualSelectionModel } from 'app/iad-framework/data-table';
import { CatalogTree } from '../../catalog-tree/catalog-tree.model';
import { documentStatusesMap } from '../../model/russian-to-english.constants';

interface RegularOperationCondition {
    hiddenOnStatuses: string[];
}

/**
 * document.status.discard=Аннулирован
 * document.status.accepted=Действующий
 * document.status.new=Новый
 * document.status.review=На согласовании
 */
export const operationStatusConditions = {
    archive: <RegularOperationCondition>{
        hiddenOnStatuses: ['archive']
    },
    fromArchive: <RegularOperationCondition>{
        hiddenOnStatuses: ['!archive']
    },
    discard: <RegularOperationCondition>{
        hiddenOnStatuses: ['discard']
    }
};

@Injectable()
export class RegularOperationsToggleService {
    updateOperationsState(operations: CatalogTree[], body: ActualSelectionModel): CatalogTree[] {
        const state = new DocumentActionState(body).getState();
        return operations.map(operation => {
            operation.toggle(this.resolveDocumentState(operation.code, state));
            return operation;
        });
    }

    /**
     * Определяет видимость кнопки по статусу выделенной записи
     * @param code
     * @param state
     */
    private resolveDocumentState(code: string, state: string): boolean {
        return code in operationStatusConditions && state
            ? operationStatusConditions[code].hiddenOnStatuses.every(status => {
                  return status[0] === '!' ? status.slice(1) === state : status !== state;
              })
            : true;
    }
}

class DocumentActionState {
    constructor(private actualSelectionModel: ActualSelectionModel) {}
    getState() {
        if (this.actualSelectionModel.selection.archive) {
            return 'archive';
        }
        return documentStatusesMap[this.actualSelectionModel.documentIndex.status];
    }
}
