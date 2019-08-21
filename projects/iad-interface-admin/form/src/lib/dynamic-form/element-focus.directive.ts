import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({selector: '[iadElementFocus]'})
export class ElementFocusDirective {

    @Output() elementFocus: EventEmitter<any> = new EventEmitter<any>();

    constructor(private eRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('click', ['$event'])
    onInnerClick(event) {
        const focus = true;
        this.toggleClickedClass(focus);
        this.elementFocus.emit({focus, nativeEvent: event});
    }

    @HostListener('document:click', ['$event'])
    onAnyClick(event) {
        const focus = this.eRef.nativeElement.contains(event.target);
        this.toggleClickedClass(focus);
        this.elementFocus.emit({focus, nativeEvent: event});
    }

    toggleClickedClass(state: boolean) {
        if (state) {
            this.renderer.addClass(this.eRef.nativeElement, 'ui-focused');
        } else {
            this.renderer.removeClass(this.eRef.nativeElement, 'ui-focused');
        }
    }
}
