import {
    OnInit,
    OnDestroy,
    Input,
    Renderer2,
    ElementRef,
    Directive,
    ViewContainerRef,
    ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { IadConfigService, IadIconOutletComponent } from 'iad-interface-admin/core';

@Directive({
    selector: '[iadTableSortIcon]'
})
export class TableSortIconDirective implements OnInit, OnDestroy {
    @Input('iadTableSortIcon') field: string;

    subscription: Subscription;

    sortOrder: number;

    /**
     * Current icon component reference
     */
    componentRef: ComponentRef<IadIconOutletComponent>;

    constructor(
        public dt: Table,
        private renderer: Renderer2,
        private el: ElementRef,
        private config: IadConfigService,
        private vctr: ViewContainerRef,
        private cfr: ComponentFactoryResolver
    ) {
        this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
            this.updateIcon();
        });
    }

    ngOnInit() {
        this.updateSortState();
        this.updateIcon();
    }

    private updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        } else if (this.dt.sortMode === 'multiple') {
            const sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    }

    private updateIcon() {
        let cssClass: string;
        if (this.sortOrder === 1) {
            cssClass = this.config.getConfig().icons['grid-sort-asc'];
        } else if (this.sortOrder === -1) {
            cssClass = this.config.getConfig().icons['grid-sort-desc'];
        } else {
            cssClass = this.config.getConfig().icons['grid-sort'];
        }
        if (!this.componentRef) {
            const cmp = this.cfr.resolveComponentFactory(IadIconOutletComponent);
            this.componentRef = this.vctr.createComponent(cmp);
        }
        (<IadIconOutletComponent>this.componentRef.instance).icon = cssClass;
        (<IadIconOutletComponent>this.componentRef.instance).addIconView();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
