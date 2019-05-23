export class ToolbarAction {
    code: string;
    toggle: boolean;
    style: string;
    value?: any;
    disabled?: boolean;

    constructor(code: string, toggle?: boolean, style?: string) {
        this.code = code;
        this.toggle = toggle;
        this.style = style;
    }
}
