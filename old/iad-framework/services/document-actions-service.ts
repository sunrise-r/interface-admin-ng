export class DocumentActionsService {
    static resolveDocumentState(state: DocumentState, updater: DocumentUpdater) {
        if (state.documentStatus === 'new') {
            updater.disableOperations();
        } else {
            updater.disableEdit();
            updater.disableDelete();
        }

        if (!state.needResolution) {
            updater.disableResolutions();
        }
        if (state.needOperation) {
            updater.disableOperations();
        }
    }

    static resovleOperationState(state: OperationState, updater: OperationUpdater) {
        if (state.operationStatus !== 'NEW') {
            updater.disableEdit();
            updater.disableDelete();
        }
    }
}

export interface OperationState {
    readonly operationStatus;
}

export interface OperationUpdater {
    disableEdit();
    disableDelete();
}

export interface DocumentState {
    readonly documentStatus;
    readonly archive;
    readonly needResolution;
    readonly needOperation;
}

export interface DocumentUpdater {
    disableOperations();
    disableResolutions();
    disableEdit();
    disableDelete();
}
