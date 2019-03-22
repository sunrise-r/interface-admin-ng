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

import { ToolbarAction } from '../models/toolbar-action.model';

@Directive({
    selector: '[jhiToolbarAction]'
})
export class ToolbarActionDirective implements OnInit, OnChanges {
    /**
     * Текущий экшн кнопки
     */
    @Input('jhiToolbarAction') action: ToolbarAction;

    /**
     * Кнопка активна
     */
    @Input()
    set active(active: boolean) {
        this.action.active = active;
    }
    get active(): boolean {
        return this.action.active;
    }

    /**
     * Action invocation event
     */
    @Output() invoke = new EventEmitter<{ nativeEvent: Event; action: ToolbarAction }>();

    /**
     * Данные выбранной строки
     */
    selectedItem: any;

    constructor(private renderer: Renderer2, private el: ElementRef) {}

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'action-' + this.action.style);
        this.addIcon();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('active' in changes) {
            this.toggleActiveCssClass();
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
        this.toggleActive();
        this.toggleActiveCssClass();
        this.invoke.emit({ nativeEvent: event, action: this.action });
    }

    private toggleActive() {
        if (this.action.toggle) {
            this.active = !this.active;
        }
    }

    private toggleActiveCssClass() {
        this.action.value = this.active;
        if (this.active) {
            this.renderer.addClass(this.el.nativeElement, 'active');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'active');
        }
    }
}
