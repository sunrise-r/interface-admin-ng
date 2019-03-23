export interface IadGridColumnInterface {
    field: string;
    header: string;
    visible: boolean;
    formatter?: string;
    style?: string;
    translate?: boolean;
    frozen?: boolean;
    position?: any;
    order?: number;
    frozenOrder?: number;
    width?: any;
    searching?: boolean;
    displayFormat?: string;
    sorting?: boolean;
    properties?: { [param: string]: string | boolean | number };
}

export class IadGridColumn implements IadGridColumnInterface {
    field: string;
    header: string;
    visible: boolean;
    formatter?: string;
    style?: string;
    width?: string | number;
    translate?: boolean;
    frozen?: boolean;
    order?: number;
    frozenOrder?: number;
    position?: string;
    searching?: boolean;
    displayFormat?: string;
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
