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
    width?: number;
    searching?: boolean;
    displayFormat?: string;
    sorting?: boolean;
    properties?: { [param: string]: any };
}

export class IadGridColumn implements IadGridColumnInterface {
    field: string;
    header: string;
    visible: boolean;
    formatter?: string;
    style?: string;
    width?: number;
    translate?: boolean;
    frozen?: boolean;
    order?: number;
    frozenOrder?: number;
    position?: string;
    searching?: boolean;
    displayFormat?: string;
    sorting?: boolean;
    properties?: { [param: string]: any };
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
