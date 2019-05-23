import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

export class ClassStyledInput implements AfterViewInit {
    styleClass: string;

    constructor(public el: ElementRef, public renderer: Renderer2) {}

    ngAfterViewInit() {
        if (this.styleClass) {
            const classes = this.styleClass.indexOf(' ') ? this.styleClass.split(' ') : [this.styleClass];
            classes.forEach(cssClass => this.renderer.addClass(this.el.nativeElement, cssClass));
        }
    }
}
