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
    constructor(field: string, header: string, formatter?: string, style?: string, translate?: boolean) {
        this.field = field;
        this.header = header;
        this.formatter = formatter;
        this.style = style;
        this.translate = translate || false;
        this.visible = true;
        this.frozen = false;
        this.order = 0;
        this.frozenOrder = 0;
        this.position = 'center';
        this.searching = false;
    }
}
