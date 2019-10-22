export interface ToolbarClickEvent {
    nativeEvent: Event;
    action: ToolbarAction;
    element: HTMLElement;
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

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    doToggle() {
        this.active = !this.active;
    }
}
