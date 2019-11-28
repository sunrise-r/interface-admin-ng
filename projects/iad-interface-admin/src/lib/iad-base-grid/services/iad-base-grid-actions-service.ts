import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum IAD_GRID_ACTIONS {
    GLOBAL_SEARCH = 'globalSearch',
    CLEAR = 'clear',
    UNSELECT = 'unselect',
    RESET_FILTER = 'resetFilter'
}

export interface IadBaseGridAction {
    action: IAD_GRID_ACTIONS;
    gridId: string;
    value?: any;
}

@Injectable()
export class IadBaseGridActionsService {

    action: Subject<IadBaseGridAction> = new Subject();

    doGlobalSearch(gridId, value) {
        this.action.next({gridId, value, action: IAD_GRID_ACTIONS.GLOBAL_SEARCH});
    }

    doClear(gridId) {
        this.action.next({gridId, action: IAD_GRID_ACTIONS.CLEAR});
    }

    doUnselect(gridId, value) {
        this.action.next({gridId, value, action: IAD_GRID_ACTIONS.UNSELECT});
    }

    doResetFilter(gridId, value) {
        this.action.next({gridId, value, action: IAD_GRID_ACTIONS.RESET_FILTER});
    }
}
