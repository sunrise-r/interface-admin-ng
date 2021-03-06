import {
    Directive,
    OnInit,
    ViewContainerRef,
    Input,
    ComponentFactoryResolver,
    Output,
    EventEmitter,
    OnDestroy,
    OnChanges,
    SimpleChanges
} from '@angular/core';


import {IadGridColumn} from '../model/iad-grid-column.model';
import {AffectTableInterface, TableTdContentInterface} from '../model/column-components.model';

@Directive({
    selector: '[iadGridTdHost]'
})
export class BaseGridTdHostDirective implements OnInit, OnDestroy, OnChanges {
    @Input() col: IadGridColumn;
    @Input() selected: any;
    @Input() rowData: any;
    @Input() components: any;
    @Output() manageTable: EventEmitter<{ code: string; value: any }> = new EventEmitter<{ code: string; value: any }>();

    componentRef: any;

    constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
        this.loadComponent();
    }

    ngOnDestroy(): void {
        this.viewContainerRef.clear();
        this.componentRef = undefined;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('selected' in changes && this.componentRef) {
            (<TableTdContentInterface>this.componentRef.instance).selected = changes['selected'].currentValue;
        }
    }

    loadComponent() {
        const component = (this.col.formatter && this.components[this.col.formatter]) || this.components['default'];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.viewContainerRef.clear();
        this.componentRef = this.viewContainerRef.createComponent(componentFactory);
        (<TableTdContentInterface>this.componentRef.instance).col = this.col;
        (<TableTdContentInterface>this.componentRef.instance).rowData = this.rowData;
        (<TableTdContentInterface>this.componentRef.instance).selected = this.selected;
        if ('manageTable' in this.componentRef.instance) {
            (<AffectTableInterface>this.componentRef.instance).manageTable.subscribe(result => {
                this.manageTable.emit(result);
            });
        }
    }
}
