import { Directive, Input, EventEmitter, ElementRef, OnInit } from '@angular/core';

// https://blog.thecodecampus.de/angular-2-set-focus-element/
@Directive({
    selector: '[jhiFocus]'
})
export class FocusDirective implements OnInit {
    @Input('jhiFocus') focusEvent: EventEmitter<boolean>;

    constructor(private element: ElementRef) {}

    ngOnInit() {
        this.focusEvent.subscribe(event => {
            if (event) {
                setTimeout(() => {
                    this.element.nativeElement.focus();
                }, 0);
            }
        });
    }
}
