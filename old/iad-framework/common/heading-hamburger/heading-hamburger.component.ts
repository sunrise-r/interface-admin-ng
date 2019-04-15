import {
    AfterContentInit,
    Component,
    ContentChildren,
    Directive,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef
} from '@angular/core';

@Directive({
    selector: '[iadHamburgerTemplate]'
})
export class HamburgerTemplateDirective {
    @Input() type: string;

    @Input('iadHamburgerTemplate') name: string;

    constructor(public template: TemplateRef<any>) {}

    getType(): string {
        return this.name;
    }
}

export interface HasLabelInterface {
    label: string;
}

@Component({
    selector: 'iad-heading-hamburger',
    template: `<div class="bordered dropdown" ngbDropdown #headingHamburger="ngbDropdown">
            <div class="content-heading has-dropdown has-border-bottom">
                <a ngbDropdownToggle aria-haspopup="true" aria-expanded="false">
                    <fa-icon [icon]="'bars'"></fa-icon>
                </a>
                <ng-template
                    [ngTemplateOutlet]="labelTemplate || defaultLabelTemplate"></ng-template>
            </div>
            <div class="dropdown-menu" ngbDropdownMenu>
                <ng-template
                    [ngTemplateOutlet]="dropdownTemplate || defaultDropdownTemplate"
                    [ngTemplateOutletContext]="{$implicit: items, currentItem: currentItem}"></ng-template>
            </div>
        </div>

        <ng-template #defaultLabelTemplate>
            <ng-content></ng-content>
        </ng-template>

        <ng-template #defaultDropdownTemplate let-items let-currentItem="currentItem">
            <ul>
                <li *ngFor="let variant of items" (click)="onClick(variant)"
                    [ngClass]="{'active' : currentItem === variant}">
                    <ng-container *ngIf="doTranslate; then translateItem; else rawItem"></ng-container>
                    <ng-template #translateItem>
                        <span>{{variant.label | translate}}</span>
                    </ng-template>
                    <ng-template #rawItem>
                        <span>{{variant.label}}</span>
                    </ng-template>
                </li>
            </ul>
        </ng-template>`
})
export class HeadingHamburgerComponent implements AfterContentInit {
    @Input() currentItem: HasLabelInterface;
    @Input() items: HasLabelInterface[];
    @Input() doTranslate: boolean;
    @Output() select: EventEmitter<HasLabelInterface> = new EventEmitter<HasLabelInterface>();

    @ContentChildren(HamburgerTemplateDirective) templates: QueryList<HamburgerTemplateDirective>;

    labelTemplate: TemplateRef<any>;
    dropdownTemplate: TemplateRef<any>;

    ngAfterContentInit() {
        this.templates.forEach(item => {
            switch (item.getType()) {
                case 'label':
                    this.labelTemplate = item.template;
                    break;

                case 'dropdown':
                    this.dropdownTemplate = item.template;
                    break;
            }
        });
    }

    onClick(selection: HasLabelInterface) {
        this.select.next(selection);
    }
}
