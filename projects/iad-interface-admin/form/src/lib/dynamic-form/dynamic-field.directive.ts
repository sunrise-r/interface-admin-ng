import { ComponentFactoryResolver, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { components } from './form-input-map';
import { ContextAware } from './core/context-aware';

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
        this.component.instance.iconStyleClass = this.styleClass;
        // for dropdownGroup
        if (this.component.instance['inputComponents']) {
            this.component.instance['inputComponents'] = this.inputComponents;
        }
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
