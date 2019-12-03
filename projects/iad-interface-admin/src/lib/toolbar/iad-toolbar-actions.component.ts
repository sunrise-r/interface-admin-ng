import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { IadToolbarActionDirective } from './iad-toolbar-action.directive';
import { ToolbarAction, ToolbarClickEvent } from './iad-toolbar-action.model';

@Component({
    selector: 'iad-toolbar-actions',
    template: `
        <div class="toolbar-action-group" *ngFor="let group of actions">
            <ng-template ngFor let-action [ngForOf]="group">
                <button
                    *ngIf="action.visible !== false"
                    title="{{translationPrefix + action.code | translate}}"
                    [class]="styleClass"
                    type="button"
                    [iadToolbarAction]="action"
                    [disabled]="action.disabled"
                    (invoke)="actionInvoke.emit($event)"
                ></button>
            </ng-template>
        </div>`
})
export class IadToolbarActionsComponent implements OnChanges {
    /**
     * Доступные действия
     */
    @Input() actions: ToolbarAction[][];

    /**
     * prefix to add to actionCode to translate it as action label
     */
    @Input() translationPrefix = '';

    /**
     * Subject to deactivate all active toggleable buttons
     */
    @Input() resetToggleableStatus: Subject<{ code: string }>;

    /**
     * Css style class to add to each toolbar action button
     */
    @Input() styleClass = 'toolbar-action';

    /**
     * Outgoing event
     */
    @Output() actionInvoke: EventEmitter<ToolbarClickEvent> = new EventEmitter<ToolbarClickEvent>();

    @ViewChildren(IadToolbarActionDirective) buttons: QueryList<IadToolbarActionDirective>;

    private _toggleableStatusSbt: Subscription;

    ngOnChanges(changes: SimpleChanges): void {
        if ('resetToggleableStatus' in changes && this.resetToggleableStatus) {
            this.subscribeToToggleableStatusChange();
        }
    }

    /**
     * Updates buttons'.active' css class by their action active state
     */
    updateButtonsState() {
        this.buttons.forEach(button => {
            if (button.action.active) {
                button.activate();
            } else {
                button.deactivate();
            }
        });
    }

    /**
     * Deactivates particular button on resetToggleableStatus event
     */
    private subscribeToToggleableStatusChange() {
        if (this._toggleableStatusSbt && !this._toggleableStatusSbt.closed) {
            this._toggleableStatusSbt.unsubscribe();
        }
        this._toggleableStatusSbt = this.resetToggleableStatus.subscribe(toggle => this.deactivate(toggle));
    }

    /**
     * Deactivates button by related toggle: {code: string} object
     * @param toggle
     */
    private deactivate(toggle: any) {
        const button = this.buttons.find(item => item.action.code === toggle.code);
        if (button) {
            button.deactivate();
        }
    }
}
