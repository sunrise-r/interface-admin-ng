import { CustomizeQuery } from 'iad-interface-admin/filter';

import { IadGridColumn } from './iad-grid-column.model';

export enum FILTER_TYPE {
    PARTICULAR = 0,
    GLOBAL = 1,
    BOTH = 2
}
export interface IadGridConfigInterface {
    columns?: IadGridColumn[];
    sortField?: string;
    sortOrder?: number;
    defaultSortField?: string;
    leftWidth?: string;
    rightWidth?: string;
    rightColumns?: IadGridColumn[];
    leftColumns?: IadGridColumn[];
    searchUrl?: string;
    filter?: CustomizeQuery;
    gridId?: string;
    reset?: boolean;
}
export class IadGridConfigModel implements IadGridConfigInterface {
    private _columns: IadGridColumn[];
    private _sortField: string;
    private _sortOrder: number;
    private _defaultSortField: string;
    private _leftWidth: string;
    private _rightWidth: string;
    private _rightColumns: IadGridColumn[];
    private _leftColumns: IadGridColumn[];
    private _searchUrl: string;
    private _filter: CustomizeQuery;
    private _gridId: string;
    private _reset: boolean;

    get columns(): IadGridColumn[] {
        return this._columns;
    }

    get sortField(): string {
        return this._sortField;
    }

    get sortOrder(): number {
        return this._sortOrder;
    }

    get defaultSortField(): string {
        return this._defaultSortField;
    }

    get leftWidth(): string {
        return this._leftWidth;
    }

    get rightWidth(): string {
        return this._rightWidth;
    }

    get rightColumns(): IadGridColumn[] {
        return this._rightColumns;
    }

    get leftColumns(): IadGridColumn[] {
        return this._leftColumns;
    }

    get searchUrl(): string {
        return this._searchUrl;
    }

    get filter(): CustomizeQuery {
        return this._filter;
    }

    get reset(): boolean {
        return this._reset;
    }

    get gridId(): string {
        return this._gridId;
    }

    /**
     * Flag that means that Config is new or not
     */
    dirty?: boolean;

    constructor() {
        this.resetConfig();
    }

    set(key, val) {
        const _key = '_' + key;
        if (this.hasOwnProperty(_key)) {
            this[_key] = val;
            this.dirty = true;
        }
    }

    merge(config: IadGridConfigInterface): void {
        Object.keys(config).forEach(key => {
            const _key = '_' + key;
            if (this.hasOwnProperty(_key)) {
                this[_key] = config[key];
            }
        });
    }

    resetConfig() {
        this._columns = [];
        this._sortField = null;
        this._sortOrder = 1;
        this._defaultSortField = 'creationDate';
        this._leftWidth = '0';
        this._rightWidth = '0';
        this._rightColumns = undefined;
        this._leftColumns = undefined;
        this._gridId = undefined;
        this._searchUrl = undefined;
        this._filter = undefined;
        this._reset = undefined;
        this.dirty = false;
    }
}
