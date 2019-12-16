import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum IAD_GRID_ACTIONS {
    GLOBAL_SEARCH = 'globalSearch',
    CLEAR = 'clear',
    UNSELECT = 'unselect',
    RESET_FILTER = 'resetFilter',
    RESET_SCROLLABLE_TABLE_WIDTH = 'resetScrollableTableWidth',
    RESET_GRID = 'resetGrid'
}

export interface IadBaseGridAction {
    action: IAD_GRID_ACTIONS;
    gridId: string;
    value?: any;
}

@Injectable()
export class IadBaseGridActionsService {

    action: Subject<IadBaseGridAction> = new Subject();

    /**
     * Add search value to global search
     * @param gridId
     * @param value
     */
    doGlobalSearch(gridId, value) {
        this.action.next({gridId, value, action: IAD_GRID_ACTIONS.GLOBAL_SEARCH});
    }

    /**
     * Clears all filters and refresh table
     * @param gridId
     */
    doClear(gridId) {
        this.action.next({gridId, action: IAD_GRID_ACTIONS.CLEAR});
    }

    /**
     * Unselect currently selected row in grid
     * @param gridId
     * @param value
     */
    doUnselect(gridId, value) {
        this.action.next({gridId, value, action: IAD_GRID_ACTIONS.UNSELECT});
    }

    /**
     * Reset table data filter for particular column
     * @param gridId
     * @param value
     */
    doResetFilter(gridId, value) {
        this.action.next({gridId, value, action: IAD_GRID_ACTIONS.RESET_FILTER});
    }

    /**
     * Reset scrollable table width to its calculated value
     * @param gridId
     */
    doResetScrollableTableWidth(gridId) {
        this.action.next({gridId, action: IAD_GRID_ACTIONS.RESET_SCROLLABLE_TABLE_WIDTH});
    }

    /**
     * Reset grid settings and grid width
     * @param gridId
     */
    doResetGrid(gridId) {
        this.action.next({gridId, action: IAD_GRID_ACTIONS.RESET_GRID});
    }
}
