import {
    Component,
    OnInit,
    Renderer2,
    Input,
    ElementRef,
    ViewChild,
    OnChanges,
    SimpleChanges,
    ContentChild, TemplateRef
} from '@angular/core';

@Component({
    selector: 'iad-tooltip-notifier',
    templateUrl: './tooltip-notifier.component.html',
    styleUrls: ['./iad-tooltip-notifier.scss']
})
export class TooltipNotifierComponent implements OnInit, OnChanges {
    content: string;

    /**
     * Notifier tooltip position: top, bottom, left, right, bottom-right, bottom-left, top-right, top-left
     */
    @Input() position = 'bottom-right';

    /**
     * Tooltip header
     */
    @Input() caption: string;

    /**
     * Notifier icon size type: 16, 24, 32
     */
    @Input() size: string | number;

    /**
     * Tooltip content
     */
    @Input() text: string;

    /**
     * Flag allowing to activate tooltip on icon and add css-class activated for notifier
     */
    @Input() activated: boolean;

    /**
     * Icon style class prefix. Will expect set up classes in your css in format .{{iconStyleClass}}-{{size}}
     */
    @Input() iconStyleClass: string;

    /**
     * Will add custom css style class to the tooltip directive
     */
    @Input() tooltipStyleClass: string;

    /**
     * Will read content child ng-template to set it as icon. may accept activated property from tooltip-notifier component
     */
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    @ViewChild('iadPTooltip') tooltip: ElementRef;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.initContent(this.text);
        if (this.iconStyleClass) {
            this.renderer.addClass(this.tooltip.nativeElement, this.iconStyleClass + '-' + this.size);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('text' in changes) {
            this.initContent(changes['text'].currentValue);
        }
    }

    initContent(text: string) {
        if (text === undefined || !this.activated) {
            this.content = '';
            return;
        }

        const captionElement = this.addDivWithText(this.caption, 'caption');
        const textElement = this.addDivWithText(text, 'text');

        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'tooltip-text');
        this.renderer.addClass(div, this.iconStyleClass + '-text');

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
