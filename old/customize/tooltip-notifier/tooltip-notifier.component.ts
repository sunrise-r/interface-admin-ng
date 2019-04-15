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
    template: `<div #jhiPTooltip class="tooltip-notifier" [jhiPTooltip]='content' [tooltipPosition]="position" tooltipStyleClass="qtip" [escape]="false"></div>`
})
export class TooltipNotifierComponent implements OnInit, OnChanges {
    content: string;

    @Input() position = 'bottom-right';
    @Input() caption: string;
    @Input() size: Sizes;
    @Input() text: string;
    @Input() requiredIcon: boolean;
    @Input() required: boolean;
    @Input() activated: boolean;
    @Input() styleClass: string;

    @ViewChild('jhiPTooltip') jhiPTooltip: ElementRef;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.initContent(this.text);
        if (this.styleClass) {
            this.renderer.addClass(this.jhiPTooltip.nativeElement, this.styleClass + '-' + this.size);
        }
        if (this.activated) {
            this.renderer.addClass(this.jhiPTooltip.nativeElement, 'activated');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('activated' in changes) {
            if (this.activated) {
                this.renderer.addClass(this.jhiPTooltip.nativeElement, 'activated');
            } else {
                this.renderer.removeClass(this.jhiPTooltip.nativeElement, 'activated');
            }
        }
        if ('text' in changes) {
            this.initContent(changes['text'].currentValue);
        }
    }

    initContent(text: string) {
        if (text === undefined) {
            this.content = '';
            return;
        }
        if (!this.activated) {
            this.content = '';
            return;
        }

        const captionElement = this.addDivWithText(this.caption, 'caption');
        const textElement = this.addDivWithText(text, 'text');

        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'tooltip-text');
        this.renderer.addClass(div, this.styleClass + '-text');

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
