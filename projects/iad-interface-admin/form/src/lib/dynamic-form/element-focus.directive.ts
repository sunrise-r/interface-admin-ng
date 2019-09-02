import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({selector: '[iadElementFocus]'})
export class ElementFocusDirective {

    private focus: boolean;

    @Output() elementFocus: EventEmitter<any> = new EventEmitter<any>();

    constructor(private eRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('click', ['$event'])
    onInnerClick(event) {
        if (!this.focus) {
            this.setFocusState(true, event);
        }
    }

    @HostListener('document:click', ['$event'])
    onAnyClick(event) {
        if (this.focus && !this.eRef.nativeElement.contains(event.target)) {
            this.setFocusState(false, event);
        }
    }

    private setFocusState(focus: boolean, event) {
        this.focus = focus;
        this.toggleClickedClass();
        this.elementFocus.emit({focus: this.focus, nativeEvent: event});
    }

    private toggleClickedClass() {
        if (this.focus) {
            this.renderer.addClass(this.eRef.nativeElement, 'ui-focused');
        } else {
            this.renderer.removeClass(this.eRef.nativeElement, 'ui-focused');
        }
    }
}
