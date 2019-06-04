import { Subject } from 'rxjs';

export interface IDataTableColumn {
    field: string;
    header: string;
    visible: boolean;
    formatter?: string;
    displayFormat?: string;
    style?: string;
    translate?: boolean;
    frozen?: boolean;
    position?: any;
    order?: number;
    frozenOrder?: number;
    width?: any;
    searching?: boolean;
    sorting?: boolean;
    properties?: { [param: string]: string | boolean | number };
}

export class DataTableColumn implements IDataTableColumn {
    field: string;
    header: string;
    visible: boolean;
    formatter?: string;
    displayFormat?: string;
    style?: string;
    width?: string | number;
    translate?: boolean;
    frozen?: boolean;
    order?: number;
    frozenOrder?: number;
    position?: string;
    searching?: boolean;
    sorting?: boolean;
    properties?: { [param: string]: string | boolean | number };
    constructor(field: string, header: string, displayFormat?: string, style?: string, translate?: boolean) {
        this.field = field;
        this.header = header;
        this.displayFormat = displayFormat;
        this.style = style;
        this.translate = translate || false;
        this.visible = true;
        this.frozen = false;
        this.order = 0;
        this.frozenOrder = 0;
        this.position = 'center';
        this.searching = false;
        this.sorting = false;
    }
}

export enum FILTER_TYPE {
    PARTICULAR = 0,
    GLOBAL = 1,
    BOTH = 2
}

export interface AffectTableInterface {
    /**
     * Наблюдатель управления таблицей
     */
    manageTable: Subject<{ code: string; value: any }>;
}

export interface TableTdContentInterface {
    selected: boolean;
    rowData: any;
    col: DataTableColumn;
}
