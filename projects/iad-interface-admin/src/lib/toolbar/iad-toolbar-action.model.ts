export interface IadToolbarActionButton {
    activate();
    deactivate();
    toggle();
}

export interface ToolbarClickEvent {
    nativeEvent: Event;
    action: ToolbarAction;
    element: HTMLElement;
    button: IadToolbarActionButton;
}

export class ToolbarAction {
    code: string;
    toggle: boolean;
    style: string;
    active?: boolean;
    value?: any;
    disabled?: boolean;
    visible?: boolean;

    constructor(code: string, toggle?: boolean, style?: string, active?: boolean) {
        this.code = code;
        this.toggle = toggle;
        this.style = style;
        this.active = active || false;
        this.visible = true;
    }
}
