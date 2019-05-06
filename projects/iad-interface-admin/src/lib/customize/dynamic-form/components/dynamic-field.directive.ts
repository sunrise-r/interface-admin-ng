import { ComponentFactoryResolver, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormInputComponent } from './form-input-component';
import { FormDateComponent } from './form-date-component';
import { FormNumberComponent } from './form-number-component';
import { FormFileComponent } from './form-file-component';
import { DropdownGroupComponent } from './dropdown-group.component';
import { FormDateTimeComponent } from './form-date-time-component';
import { FormTextareaComponent } from './form-textarea-component';
import { Subscription } from 'rxjs';
import {ContextAware} from '../context-aware';
import {FormBooleanComponent} from './form-boolean-component';
import {FormMultiSelectComponent} from './form-multi-select.component';
import {DropdownComponent} from './form-dropdown-select.component';


const components = {
    textbox: FormInputComponent,
    date: FormDateComponent,
    file: FormFileComponent,
    number: FormNumberComponent,
    dropDownGroup: DropdownGroupComponent,
    hidden: FormInputComponent,
    datetime: FormDateTimeComponent,
    textarea: FormTextareaComponent,
    boolean: FormBooleanComponent,
    multiSelect: FormMultiSelectComponent,
    dropdown: DropdownComponent
};

@Directive({
    selector: '[iadDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnDestroy {
    @Input('iadDynamicField') config;

    @Input() group: FormGroup;

    @Input() styleClass: string;

    /**
     * Компоненты инпутов формы
     * В виде объекта
     * {
     *     [inputKey: string]: any
     * }
     */
    @Input() inputComponents: { [param: string]: any } = {};

    @Input() context: any;

    @Output() touched: EventEmitter<any> = new EventEmitter<any>();

    private component: any;

    private components: any;

    private subscription: Subscription;

    constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

    ngOnInit() {
        this.components = Object.assign({}, components, this.inputComponents);
        const component = this.components[this.config.controlType];
        const factory = this.resolver.resolveComponentFactory<any>(component);
        this.component = this.container.createComponent(factory);
        if (this.isContextAware(this.component.instance)) {
            this.component.instance.context = this.context;
        }
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
        this.component.instance.styleClass = this.styleClass;
        if (this.component.instance.touched) {
            this.subscription = this.component.instance.touched.subscribe(val => this.touched.emit(val));
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    isContextAware(object): object is ContextAware {
        const contextAware = object as ContextAware;
        return contextAware.context !== undefined;
    }
}
