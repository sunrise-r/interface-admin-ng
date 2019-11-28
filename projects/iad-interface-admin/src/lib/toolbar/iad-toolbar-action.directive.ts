import {
    Directive,
    OnInit,
    Input,
    ElementRef,
    Renderer2,
    HostListener,
    Output,
    EventEmitter
} from '@angular/core';

import { IadToolbarActionButton, ToolbarAction, ToolbarClickEvent } from './iad-toolbar-action.model';

@Directive({
    selector: '[iadToolbarAction]'
})
export class IadToolbarActionDirective implements OnInit, IadToolbarActionButton {
    /**
     * Текущий экшн кнопки
     */
    @Input('iadToolbarAction') action: ToolbarAction;

    /**
     * Action invocation event
     */
    @Output() invoke = new EventEmitter<ToolbarClickEvent>();

    constructor(private renderer: Renderer2, private el: ElementRef) {}

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'action-' + this.action.style);
        this.addIcon();
    }

    addIcon() {
        const span = this.renderer.createElement('span');
        this.renderer.addClass(span, 'iad-toolbar-icon');
        this.renderer.addClass(span, this.action.style);
        this.renderer.appendChild(this.el.nativeElement, span);
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.invoke.emit({
            nativeEvent: event,
            button: this,
            action: this.action,
            element: this.el.nativeElement
        });
    }

    /**
     * Switches action active state
     */
    toggle() {
        if (!this.action.active) {
            this.activate();
        } else {
            this.deactivate();
        }
    }

    /**
     * Activate action and set active css class to button
     */
    activate() {
        this.showToggleableWarn();
        this.action.active = true;
        this.renderer.addClass(this.el.nativeElement, 'active');
    }

    /**
     * Deactivate action and remove active css class from button
     */
    deactivate() {
        this.showToggleableWarn();
        this.action.active = false;
        this.renderer.removeClass(this.el.nativeElement, 'active');
    }

    /**
     * displays warning if button isn't marked as toggleable
     */
    private showToggleableWarn() {
        if (!this.action.toggle) {
            console.warn(`Action ${this.action.code} is not marked as toggleable`);
        }
    }
}
