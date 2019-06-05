import { ToolbarAction, documentStatusesMap } from 'iad-interface-admin';
import { DocumentState, DocumentUpdater, OperationState, OperationUpdater } from '../services/document-actions-service';

export class DocumentActionState implements DocumentState {
    public readonly archive = this.actualSelectionModel.selection.archive;
    public readonly documentStatus = documentStatusesMap[this.actualSelectionModel.documentIndex.status];
    public readonly needResolution = this.actualSelectionModel.selection.onResolution;
    public readonly needOperation = this.actualSelectionModel.selection.onOperation;
    constructor(private actualSelectionModel: any) {}
}

export class DocumentActionUpdater implements DocumentUpdater {
    constructor(private toolbarActions: ToolbarAction[]) {}
    disableEdit() {
        this.toolbarActions.filter(action => action.code === 'edit').forEach(action => (action.disabled = true));
    }
    disableOperations() {
        this.toolbarActions.filter(action => action.code === 'operation').forEach(action => (action.disabled = true));
    }
    disableResolutions() {
        this.toolbarActions
            .filter(action => ['ACCEPTED', 'REJECTED', 'REVIEW'].indexOf(action.code) !== -1)
            .forEach(action => (action.disabled = true));
    }

    disableDelete() {
        this.toolbarActions.filter(action => action.code === 'delete').forEach(action => (action.disabled = true));
    }
}

export class OperationActionUpdater implements OperationUpdater {
    constructor(private actions: ToolbarAction[]) {}

    disableDelete() {
        this.actions.filter(action => action.code === 'operationRemove').forEach(action => (action.disabled = true));
    }

    disableEdit() {
        this.actions.filter(action => action.code === 'operationEdit').forEach(action => (action.disabled = true));
    }

    disableResolutions() {
        this.actions
            .filter(action => ['ACCEPTED', 'REJECTED', 'REVIEW'].indexOf(action.code) !== -1)
            .forEach(action => (action.disabled = true));
    }
}

export class OperationActionState implements OperationState {
    public readonly operationStatus = this.body.selection.operationStatus;
    readonly needResolution = 'REJECTED' !== this.body.selection.operationStatus && 'ACCEPTED' !== this.body.selection.operationStatus;

    constructor(private body: any) {}
}
