import { FormInput } from './form-input.model';

export type FormGroupChildColumn = (FormInput<any> | FormInputGroup)[];

export type FormGroupChild = FormInput<any> | FormInputGroup;

export interface FormInputGroupInterface {
    /**
     * will not show collapse component, and will not group reference fields to substructure
     * Not considered if FlattenFields or FlattenData property is used
     */
    checkPlainOption(): boolean;

    /**
     * Will not show collapse component
     */
    checkFlattenFields(): boolean;

    /**
     * Will not group reference fields to substructure
     */
    checkFlattenData(): boolean;

    /**
     * Will return checkFlattenFields(options) if checkFlattenData or checkFlattenFields is not undefined
     * Will return checkPlainOption in all other cases
     * Will return TRUE if data is flatten for current group and false/undefined if data is grouped by current group "key" field
     */
    checkFlattenFieldsState(): boolean;

    /**
     * Will return checkFlattenData(options) if checkFlattenData or checkFlattenFields is not undefined
     * Will return checkPlainOption in all other cases
     * Will return TRUE if fields are flatten and false/undefined if fields may be collapsable
     */
    checkFlattenDataState(): boolean;

    /**
     * Default "collapsed" status when group is collapsable
     */
    checkCollapsedDefaultState(): boolean;

    /**
     * Ability to add children into current group
     */
    addChildren(children: FormGroupChildColumn[]): FormInputGroupInterface;
}

export class FormInputGroup implements FormInputGroupInterface {
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
    properties?: any;

    constructor(options: {
        children?: FormGroupChildColumn[];
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
        this.properties = options.properties;
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
        this.collapsed = this.checkCollapsedDefaultState();
        this.collapsable = !this.checkFlattenFieldsState();
    }

    checkPlainOption(): boolean {
        return this.properties && this.properties.plainReference;
    }

    checkFlattenFields(): boolean {
        return this.properties && this.properties.flattenFields;
    }

    checkFlattenData(): boolean {
        return this.properties && this.properties.flattenData;
    }

    checkFlattenFieldsState() {
        const flattenData = this.checkFlattenData();
        const flattenFields = this.checkFlattenFields();
        const considerPlainOption = flattenData === undefined && flattenFields === undefined;
        return considerPlainOption ? this.checkPlainOption() : flattenFields;
    }

    checkFlattenDataState(): boolean {
        const flattenData = this.checkFlattenData();
        const flattenFields = this.checkFlattenFields();
        const considerPlainOption = flattenData === undefined && flattenFields === undefined;
        return considerPlainOption ? this.checkPlainOption() : flattenData;
    }

    // True by default
    checkCollapsedDefaultState(): boolean {
        return this.properties && this.properties.collapsed !== undefined ? this.properties.collapsed : true;
    }

    addChildren(children: FormGroupChildColumn[]) {
        this.children = this.children.concat(children);
        return this;
    }
}
