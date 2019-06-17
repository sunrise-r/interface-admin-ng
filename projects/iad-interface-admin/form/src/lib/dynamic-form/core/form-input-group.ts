import { FormInput } from './form-input.model';

export type FormGroupChildColumn = (FormInput<any> | FormInputGroup)[];

export type FormGroupChild = FormInput<any> | FormInputGroup;

export class FormInputGroup {
    controlType: string;
    column: number;
    key: string;
    label: string;
    order: number;
    dependencies: string[];
    children: FormGroupChildColumn[];
    visible: boolean;
    translate: boolean;
    collapsed = true;
    validators: {
        email?: boolean;
        required?: boolean;
        minLength?: string;
        maxLength?: string;
    };

    constructor(options: {
        children: FormGroupChildColumn[];
        key?: string;
        label?: string;
        column?: number;
        order?: number;
        dependencies?: string[];
        visible?: boolean;
        translate?: boolean,
        properties?: any,
        validators?: any
    }) {
        this.key = options.key || '';
        this.label = options.label || '';
        this.children = options.children || [];
        this.controlType = 'dropDownGroup';
        this.order = options.order || 1;
        this.column = options.column || 0;
        this.dependencies = options.dependencies || [];
        this.visible = options.visible;
        this.translate = options.translate || false;
        this.validators = options.validators;
        if (options.properties && options.properties.collapsed !== undefined) {
            this.collapsed = options.properties.collapsed;
        }
    }
}
