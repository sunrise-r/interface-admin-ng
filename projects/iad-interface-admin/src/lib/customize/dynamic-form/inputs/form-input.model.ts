export interface FormatValueInterface {
    formatValue();
}

export interface FormatNameInterface {
    formatName();
}

export class FormInput<T> {
    value: T;
    key: string;
    label: string;
    column: number;
    validators: any;
    order: number;
    controlType: string;
    disabled: boolean;
    readonly: boolean;
    visible: boolean;
    translate: boolean;

    constructor(
        options: {
            value?: T;
            key?: string;
            label?: string;
            validators?: any;
            order?: number;
            controlType?: string;
            disabled?: boolean;
            readonly?: boolean;
            column?: number;
            visible?: boolean;
            translate?: boolean;
        } = {}
    ) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || {};
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.disabled = options.disabled || false;
        this.readonly = options.readonly || false;
        this.column = options.column || 0;
        this.visible = options.visible;
        this.translate = options.translate || false;
    }
}
