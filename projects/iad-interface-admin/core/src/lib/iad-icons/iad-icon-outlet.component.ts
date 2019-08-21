import { Component, EmbeddedViewRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { IadConfigService } from '../env/iad-env.module';

@Component({
    selector: 'iad-icon-outlet',
    template: `
        <ng-template #faIcon let-icon="icon" let-size="size" let-cssStyle="cssStyle" let-cssClass="cssClass">
            <fa-icon [icon]="icon" [size]="size || null" [ngStyle]="cssStyle || {}" [ngClass]="[cssClass ? cssClass : '']"></fa-icon>
        </ng-template>
        <ng-template #cssIcon let-icon="icon" let-cssClass="cssClass">
            <i [ngClass]="[icon ? icon : '', cssClass ? cssClass : '']"></i>
        </ng-template>
    `
})
export class IadIconOutletComponent implements OnChanges {

    @Input()
    set icon(icon: string) {
        this._icon = icon;
        this.iconArr = icon ? icon.split(' ') : undefined;
    }
    get icon(): string {
        return this._icon;
    }

    @Input()
    set configIcon(icon: string) {
        this._configIcon = icon;
        this.initConfigIcon(icon);
    }
    get configIcon(): string {
        return this._configIcon;
    }

    /**
     * String size for fa icons
     */
    @Input() size: string;

    /**
     * ngStyle object
     */
    @Input() cssStyle: any;

    /**
     * ngStyle object
     */
    @Input() cssClass: any;

    /**
     * FontAwesome icon
     */
    @ViewChild('faIcon') faIconTpl;

    /**
     * Css icon
     */
    @ViewChild('cssIcon') cssIconTpl;

    iconArr: string[];

    private _icon: string;

    private _configIcon: string;

    private _view: EmbeddedViewRef<any>;

    constructor(public viewContainerRef: ViewContainerRef,  private config: IadConfigService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('icon' in changes) {
            this.addIconView();
        }
    }

    initConfigIcon(icon: string) {
        this.icon = this.config.getConfig().icons[icon];
        this.addIconView();
    }

    addIconView() {
        if (this._view) {
            this._view.destroy();
        }
        const context: any = {};
        if (this.size) {
            context.size = this.size;
        }
        if (this.cssStyle) {
            context.cssStyle = this.cssStyle;
        }
        if (this.cssClass) {
            context.cssClass = this.cssClass;
        }
        if (this.iconArr && (this.iconArr[0] === 'fa' || this.iconArr[0] === 'fas' || this.iconArr[0] === 'far')) {
            context.icon = this.iconArr;
            this._view = this.viewContainerRef.createEmbeddedView(this.faIconTpl, context);
        } else {
            context.icon = this.icon;
            this._view = this.viewContainerRef.createEmbeddedView(this.cssIconTpl, context);
        }
    }
}
