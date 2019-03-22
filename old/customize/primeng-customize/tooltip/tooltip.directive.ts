import { Directive, ElementRef, AfterViewInit, NgZone, Input } from '@angular/core';
import { Tooltip } from 'primeng/components/tooltip/tooltip';
import { DomHandler } from 'primeng/components/dom/domhandler';
@Directive({
    selector: '[jhiPTooltip]'
})
export class TooltipDirective extends Tooltip implements AfterViewInit {
    @Input('jhiPTooltip')
    set text(text: string) {
        this._text = text;
        if (this.active) {
            if (this._text) {
                if (this.container && this.container.offsetParent) {
                    this.updateText();
                } else {
                    this.show();
                }
            } else {
                this.hide();
            }
        }
    }
    get text(): string {
        return this._text;
    }

    constructor(el: ElementRef, domHandler: DomHandler, zone: NgZone) {
        super(el, domHandler, zone);
    }

    align(): void {
        const position = this.tooltipPosition;
        switch (position) {
            case 'bottom-right':
                this.alignBottomRight();
                if (this.isOutOfBounds()) {
                    this.alignBottomLeft();
                    if (this.isOutOfBounds()) {
                        this.alignTopRight();
                        if (this.isOutOfBounds()) {
                            this.alignTopLeft();
                        }
                    }
                }
                break;
            case 'bottom-left':
                this.alignBottomLeft();
                if (this.isOutOfBounds()) {
                    this.alignBottomRight();
                    if (this.isOutOfBounds()) {
                        this.alignTopLeft();
                        if (this.isOutOfBounds()) {
                            this.alignTopRight();
                        }
                    }
                }
                break;
            case 'top-right':
                this.alignTopRight();
                if (this.isOutOfBounds()) {
                    this.alignTopLeft();
                    if (this.isOutOfBounds()) {
                        this.alignBottomRight();
                        if (this.isOutOfBounds()) {
                            this.alignBottomLeft();
                        }
                    }
                }
                break;
            case 'top-left':
                this.alignTopLeft();
                if (this.isOutOfBounds()) {
                    this.alignTopRight();
                    if (this.isOutOfBounds()) {
                        this.alignBottomLeft();
                        if (this.isOutOfBounds()) {
                            this.alignBottomRight();
                        }
                    }
                }
                break;
            default:
                super.align();
        }
    }

    alignBottomRight() {
        this.preAlign('bottom-right');
        const hostOffset = this.getHostOffset();
        const left = hostOffset.left + this.domHandler.getOuterWidth(this.el.nativeElement);
        const top = hostOffset.top + this.domHandler.getOuterHeight(this.el.nativeElement);
        this.setContainerPosition(left, top);
    }

    alignBottomLeft() {
        this.preAlign('bottom-left');
        const hostOffset = this.getHostOffset();
        const left = hostOffset.left - this.domHandler.getOuterWidth(this.container);
        const top = hostOffset.top + this.domHandler.getOuterHeight(this.el.nativeElement);
        this.setContainerPosition(left, top);
    }

    alignTopRight() {
        this.preAlign('top-right');
        const hostOffset = this.getHostOffset();
        const left = hostOffset.left + this.domHandler.getOuterWidth(this.el.nativeElement);
        const top = hostOffset.top - this.domHandler.getOuterHeight(this.container);
        this.setContainerPosition(left, top);
    }

    alignTopLeft() {
        this.preAlign('top-left');
        const hostOffset = this.getHostOffset(),
            left = hostOffset.left - this.domHandler.getOuterWidth(this.container),
            top = hostOffset.top - this.domHandler.getOuterHeight(this.container);
        this.setContainerPosition(left, top);
    }

    protected setContainerPosition(left: number, top: number) {
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    }
}
