import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolbarAction } from '../models/toolbar-action.model';

@Component({
    selector: 'iad-toolbar-actions',
    template: `<div class="toolbar-action-group" *ngFor="let group of actions">
        <ng-template ngFor let-action [ngForOf]="group">
            <button
                *ngIf="action.visible !== false"
                title="{{translationPrefix + action.code | translate}}"
                [class]="styleClass"
                type="button"
                [iadToolbarAction]="action"
                [active]="action.active"
                [disabled]="action.disabled"
                (invoke)="actionInvoke.emit($event)"
            ></button>
        </ng-template>
  </div>`
})
export class ToolbarActionsComponent {
    /**
     * Доступные действия
     */
    @Input() actions: ToolbarAction[][];

    /**
     * prefix to add to actionCode to translate it as action label
     */
    @Input() translationPrefix = '';

    /**
     * Css style class to add to each toolbar action button
     */
    @Input() styleClass = 'toolbar-action';

    /**
     * Outgoing event
     */
    @Output()
    actionInvoke: EventEmitter<{ nativeEvent: Event; action: ToolbarAction }> = new EventEmitter<{
        nativeEvent: Event;
        action: ToolbarAction;
    }>();
}
