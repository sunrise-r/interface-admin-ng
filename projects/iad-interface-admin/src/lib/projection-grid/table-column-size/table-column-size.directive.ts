import { Directive, Input, ElementRef, OnInit, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[iadTableColumnSize]'
})
export class TableColumnSizeDirective implements OnInit, OnChanges {

    @Input('iadTableColumnSize') size: string | number;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.setInlineWidth();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes['size'] !== undefined && changes['size'].currentValue !== undefined) {
            this.setInlineWidth();
        }
    }

    setInlineWidth() {
        this.renderer.setStyle(this.el.nativeElement, 'width', this.size + 'px');
    }
}
