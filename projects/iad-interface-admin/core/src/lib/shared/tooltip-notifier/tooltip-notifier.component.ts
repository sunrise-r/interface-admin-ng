import {
  Component,
  OnInit,
  Renderer2,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ContentChild, TemplateRef
} from '@angular/core';

const Size16 = 16;
const Size24 = 24;
const Size32 = 32;

enum Sizes {
  Size16,
  Size24,
  Size32
}

@Component({
  selector: 'iad-tooltip-notifier',
  templateUrl: './tooltip-notifier.component.html',
  styleUrls: ['./iad-tooltip-notifier.scss']
})
export class TooltipNotifierComponent implements OnInit, OnChanges {
  content: string;

  @Input() position = 'bottom-right';
  @Input() caption: string;
  @Input() size: Sizes;
  @Input() text: string;
  @Input() activated: boolean;
  @Input() iconStyleClass: string;
  @Input() tooltipStyleClass: string;
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @ViewChild('iadPTooltip') tooltip: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
