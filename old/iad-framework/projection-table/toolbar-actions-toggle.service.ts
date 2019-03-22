import { Injectable } from '@angular/core';
import { ToolbarAction } from '../toolbar';
import {
    DocumentActionsService,
    DocumentState,
    DocumentUpdater,
    OperationState,
    OperationUpdater
} from 'app/iad-framework/services/document-actions-service';
import { ActualSelectionModel } from 'app/iad-framework/data-table';
import { documentStatusesMap } from 'app/iad-framework/model/russian-to-english.constants';

interface ActionStatusCondition {
    disableOnStatuses: string[];
}

type IterateActionsCallback = (action: ToolbarAction) => void;

export const alwaysEnabledActions = ['new', 'help', 'refresh', 'add', 'filter', 'newsFilter'];

export const actionStatusConditions = {
    operation: <ActionStatusCondition>{
        disableOnStatuses: ['REVIEW', 'DISCARD']
    },
    merge: <ActionStatusCondition>{
        disableOnStatuses: ['REVIEW', 'DISCARD']
    },
    divide: <ActionStatusCondition>{
        disableOnStatuses: ['REVIEW', 'DISCARD']
    },
    discard: <ActionStatusCondition>{
        disableOnStatuses: ['REVIEW', 'DISCARD']
    }
};

@Injectable()
export class ToolbarActionsToggleService {
    constructor() {}

    /**
     * Задисэйблить все действия при инициализации
     * @param actions
     */
    disableActions(actions: ToolbarAction[][]): ToolbarAction[][] {
        this.iterateActions(actions, action => {
            action.disabled = alwaysEnabledActions.indexOf(action.code) === -1;
        });
        return actions;
    }

    /**
     * Энейблить все действия при выделении
     * @param actions
     */
    enableActions(actions: ToolbarAction[][]): ToolbarAction[][] {
        this.iterateActions(actions, action => {
            action.disabled = false;
        });
        return actions;
    }

    /**
     * Расчитать видимость actions
     * @param actions Список Actions которые содержаться в текущем  projection
     * @param body selected document info
     */
    resolveActionsByStatus(actions: ToolbarAction[][], body: ActualSelectionModel): ToolbarAction[][] {
        if (body.type === 'document') {
            this.iterateActions(actions, action => {
                action.disabled = this.isDisabledByStatusCondition(action, body.documentDTO.status);
            });
        }
        this.updateActionsState(actions, body);
        return actions;
    }

    /**
     * Итератор по кнопкам в группах
     * @param actions
     * @param callback
     */
    private iterateActions(actions: ToolbarAction[][], callback: IterateActionsCallback) {
        actions.forEach(group => group.forEach(action => callback(action)));
    }

    /**
     * Определяет видимость кнопки по статусу выделенной записи
     * @param code
     * @param status
     */
    private isDisabledByStatusCondition(code, status?: string): boolean {
        if (alwaysEnabledActions.indexOf(code) !== -1) {
            return false;
        }
        if (code in actionStatusConditions && status) {
            return (<ActionStatusCondition>actionStatusConditions[code]).disableOnStatuses.indexOf(status) !== -1;
        }
        return status === undefined;
    }

    private updateActionsState(actionGroups: ToolbarAction[][], body: ActualSelectionModel): void {
        const actionsHeap = actionGroups.reduce(
            (accu, group) =>
                accu.concat(
                    group.map(action => {
                        action.disabled = false;
                        return action;
                    })
                ),
            []
        );

        if (body.type === 'operation') {
            DocumentActionsService.resovleOperationState(new OperationActionState(body), new OperationActionUpdater(actionsHeap));
        }

        if (body.type === 'document') {
            DocumentActionsService.resolveDocumentState(new DocumentActionState(body), new DocumentActionUpdater(actionsHeap));
        }
    }
}

class DocumentActionState implements DocumentState {
    public readonly archive = this.actualSelectionModel.selection.archive;
    public readonly documentStatus = documentStatusesMap[this.actualSelectionModel.documentIndex.status];
    public readonly needResolution = this.actualSelectionModel.selection.onResolution;
    public readonly needOperation = this.actualSelectionModel.selection.onOperation;
    constructor(private actualSelectionModel: ActualSelectionModel) {}
}

class DocumentActionUpdater implements DocumentUpdater {
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

class OperationActionUpdater implements OperationUpdater {
    constructor(private actions: ToolbarAction[]) {}

    disableDelete() {
        this.actions.filter(action => action.code === 'operationRemove').forEach(action => (action.disabled = true));
    }

    disableEdit() {
        this.actions.filter(action => action.code === 'operationEdit').forEach(action => (action.disabled = true));
    }
}

class OperationActionState implements OperationState {
    public readonly operationStatus = this.body.selection.operationStatus;

    constructor(private body: ActualSelectionModel) {}
}
