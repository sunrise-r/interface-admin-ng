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

    activate() {
        this.action.active = true;
        this.renderer.addClass(this.el.nativeElement, 'active');
    }

    deactivate() {
        this.action.active = false;
        this.renderer.removeClass(this.el.nativeElement, 'active');
    }
}
