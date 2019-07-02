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
    collapsed: boolean; // Flag to set group collapse component "collapsed" option defaults
    validators: {
        email?: boolean;
        required?: boolean;
        minLength?: string;
        maxLength?: string;
    };
    collapsable?: boolean; // Flag to set group collapse template to apply or not

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
        this.collapsed = this.checkCollapsedDefaultState(options);

        // TODO replace considerGroup with 2 options: flattenInputGroup and flattenDataGroup
        this.collapsable = this.checkCollapsableOption(options);
        // plainReference
        // flattenInputGroup = plainReference || flattenInputGroup
        // flattenDataGroup = plainReference || flattenDataGroup
        // considerGroup = !plainReference && !flattenDataGroup
    }

    // will not show collapse component for plainReference, but will group reference fields to substructure
    checkCollapsableOption(options) {
        return this.checkPlainOption(options) ? options.properties && options.properties.considerGroup : true;
    }

    // will not show collapse component, and will not group reference fields to substructure
    checkPlainOption(options) {
        return options.properties && options.properties.plainReference;
    }

    // True by default
    checkCollapsedDefaultState(options) {
        return options.properties && options.properties.collapsed !== undefined ? options.properties.collapsed : true;
    }
}
