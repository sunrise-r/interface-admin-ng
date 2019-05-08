import {Component} from '@angular/core';
import {DropdownItem} from 'primeng/primeng';

@Component({
  selector: 'iad-dropdown-item',
  template: `
        <li (click)="onOptionClick($event)" role="option"
            [attr.aria-label]="option.label"
            [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'ui-dropdown-item ui-corner-all':true,
                                                'ui-state-highlight': selected,
                                                'ui-state-disabled':(option.disabled),
                                                'ui-dropdown-item-empty': !option.label||option.label.length === 0}">
            <span *ngIf="!template">{{option.label||'empty'}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `
})
export class DropdownItemComponent extends DropdownItem {}
