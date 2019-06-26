import { CustomizeQuery } from 'iad-interface-admin/filter';

import { IadGridColumn } from './iad-grid-column.model';

export enum FILTER_TYPE {
    PARTICULAR = 0,
    GLOBAL = 1,
    BOTH = 2
}
export class IadGridConfigModel {
    columns: IadGridColumn[];
    sortField: string;
    sortOrder: number;
    defaultSortField: string;
    leftWidth: string;
    rightWidth: string;
    rightColumns?: IadGridColumn[];
    leftColumns?: IadGridColumn[];
    searchUrl?: string;
    filter?: CustomizeQuery;
    reset?: boolean;
    constructor() {
        this.columns = [];
        this.sortField = null;
        this.sortOrder = 1;
        this.defaultSortField = 'creationDate';
        this.leftWidth = '0';
        this.rightWidth = '0';
    }
}
