import { FormInput } from './inputs/form-input.model';

export type FormGroupChildColumn = (FormInput<any> | FormInputGroup)[];

export type FormGroupChild = FormInput<any> | FormInputGroup;

export class FormInputGroup {
    controlType: string;
    column: number;
    key: string;
    label: string;
    order: number;
    visible: boolean;
    translate: boolean;
    children: FormGroupChildColumn[];

    constructor(options: { children: FormGroupChildColumn[]; key?: string; label?: string; column?: number; order?: number; visible?: boolean; translate?: boolean }) {
        this.key = options.key || '';
        this.label = options.label || '';
        this.children = options.children || [];
        this.controlType = 'dropDownGroup';
        this.order = options.order || 1;
        this.column = options.column || 0;
        this.visible = options.visible;
        this.translate = options.translate || false;
    }
}
