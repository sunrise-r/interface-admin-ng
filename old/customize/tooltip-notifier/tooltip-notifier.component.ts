import { Component, OnInit, Renderer2, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

const Size16 = 16;
const Size24 = 24;
const Size32 = 32;

enum Sizes {
    Size16,
    Size24,
    Size32
}

@Component({
    selector: 'jhi-tooltip-notifier',
    templateUrl: './tooltip-notifier.component.html'
})
export class TooltipNotifierComponent implements OnInit, AfterViewInit, OnChanges {
    content: string;

    @Input() position = 'bottom-right';
    @Input() caption: string;
    @Input() size: Sizes;
    @Input() text: string;

    @ViewChild('jhiPTooltip') jhiPTooltip: ElementRef;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'jhi-tooltip-notifier');
        this.initContent(this.text);
    }

    ngAfterViewInit(): void {
        this.renderer.addClass(this.jhiPTooltip.nativeElement, 'error-tooltip-' + this.size);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('text' in changes) {
            this.initContent(changes['text'].currentValue);
        }
    }

    initContent(text: string) {
        const captionElement = this.addDivWithText(this.caption, 'caption');
        const textElement = this.addDivWithText(text, 'text');

        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'error-text');

        this.renderer.appendChild(div, captionElement);
        this.renderer.appendChild(div, textElement);

        this.content = div.outerHTML;
    }

    private addDivWithText(text: string, className: string) {
        const div = this.renderer.createElement('div');
        const divInnerText = this.renderer.createText(text);
        this.renderer.addClass(div, className);
        this.renderer.appendChild(div, divInnerText);
        return div;
    }
}
