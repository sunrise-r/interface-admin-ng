export class DocumentActionsService {
    static resolveDocumentState(state: DocumentState, updater: DocumentUpdater) {
        if (state.documentStatus === 'new') {
            updater.disableOperations();
        } else if (state.documentStatus) {
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
        if (!state.needResolution) {
            updater.disableResolutions();
        }
    }
}

export interface OperationState {
    readonly needResolution;
    readonly operationStatus;
}

export interface OperationUpdater {
    disableEdit();
    disableDelete();
    disableResolutions();
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
