import {
    Directive,
    OnInit,
    Input,
    ElementRef,
    Renderer2,
    HostListener,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';

import { ToolbarAction } from './toolbar-action.model';

@Directive({
    selector: '[iadToolbarAction]'
})
export class ToolbarActionDirective implements OnInit, OnChanges {
    /**
     * Текущий экшн кнопки
     */
    @Input('iadToolbarAction') action: ToolbarAction;

    /**
     * Кнопка активна
     */
    @Input() active: boolean;

    /**
     * Action invocation event
     */
    @Output() invoke = new EventEmitter<{ nativeEvent: Event; action: ToolbarAction }>();

    constructor(private renderer: Renderer2, private el: ElementRef) {}

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'action-' + this.action.style);
        this.addIcon();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('active' in changes) {
            this.toggleActivity(this.active);
        }
    }

    addIcon() {
        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'icon');
        this.renderer.addClass(div, this.action.style);
        this.renderer.appendChild(this.el.nativeElement, div);
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.action.toggle) {
            this.updateActiveState(!this.active);
        }
        this.toggleActivity(this.active);
        this.invoke.emit({ nativeEvent: event, action: this.action });
    }

    toggleActivity(activate?: boolean) {
        if (activate) {
            this.activate();
        } else {
            this.deactivate();
        }
    }

    activate() {
        this.updateActiveState(true);
        this.renderer.addClass(this.el.nativeElement, 'active');
    }

    deactivate() {
        this.updateActiveState(false);
        this.renderer.removeClass(this.el.nativeElement, 'active');
    }

    private updateActiveState(state: boolean) {
        this.action.active = this.active = state;
    }
}
