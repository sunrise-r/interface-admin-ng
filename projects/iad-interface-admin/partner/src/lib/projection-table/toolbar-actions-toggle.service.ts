import { Injectable } from '@angular/core';
import { ToolbarAction } from 'iad-interface-admin';
import { DocumentActionsService } from '../services/document-actions-service';
import { ActualSelectionModel } from '../data-table/models/actual-selection.model';
import {
    DocumentActionState,
    DocumentActionUpdater,
    OperationActionState,
    OperationActionUpdater
} from './tollbar-action-state-resolvers.model';

interface ActionStatusCondition {
    disableOnStatuses: string[];
}

type IterateActionsCallback = (action: ToolbarAction) => void;

export const alwaysEnabledActions = ['new', 'help', 'refresh', 'add', 'filter', 'newsFilter', 'partnershipFilter'];

export const actionStatusConditions = {
    operationForm: <ActionStatusCondition>{
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
     * @param force
     */
    disableActions(actions: ToolbarAction[][], force?: boolean): ToolbarAction[][] {
        this.iterateActions(actions, action => {
            action.disabled = force || alwaysEnabledActions.indexOf(action.code) === -1;
        });
        return actions;
    }

    /**
     * Энейблить все действия при выделении
     * @param actions
     * @param forcedOnly enable only forced disabled actions
     */
    enableActions(actions: ToolbarAction[][], forcedOnly?: boolean): ToolbarAction[][] {
        this.iterateActions(actions, action => {
            action.disabled = forcedOnly ? alwaysEnabledActions.indexOf(action.code) === -1 : false;
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
        const actionsHeap = actionGroups.reduce((accu, group) => accu.concat(group), []).map(action => {
            action.disabled = false;
            return action;
        });

        if (body.type === 'operation') {
            DocumentActionsService.resovleOperationState(new OperationActionState(body), new OperationActionUpdater(actionsHeap));
        }

        if (body.type === 'document') {
            DocumentActionsService.resolveDocumentState(new DocumentActionState(body), new DocumentActionUpdater(actionsHeap));
        }
    }
}
