import { Directive, ElementRef, AfterViewInit, NgZone, Input } from '@angular/core';
import { Tooltip } from 'primeng/components/tooltip/tooltip';
import {IadDomHandler} from '../dom/iad-dom-handler';
@Directive({
  selector: '[iadPTooltip]'
})
export class TooltipDirective extends Tooltip implements AfterViewInit {

  @Input('iadPTooltip')
  text: string;

  constructor(el: ElementRef, zone: NgZone) {
    super(el, zone);
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
    const hostOffset = this.getHostOffset();
    const left = hostOffset.left + IadDomHandler.getOuterWidth(this.el.nativeElement);
    const top = hostOffset.top + IadDomHandler.getOuterHeight(this.el.nativeElement);
    this.preAlign('bottom-right');
    this.setContainerPosition(left, top);
  }

  alignBottomLeft() {
    const hostOffset = this.getHostOffset();
    const left = hostOffset.left - IadDomHandler.getOuterWidth(this.container);
    const top = hostOffset.top + IadDomHandler.getOuterHeight(this.el.nativeElement);
    this.preAlign('bottom-left');
    this.setContainerPosition(left, top);
  }

  alignTopRight() {
    const hostOffset = this.getHostOffset();
    const left = hostOffset.left + IadDomHandler.getOuterWidth(this.el.nativeElement);
    const top = hostOffset.top - IadDomHandler.getOuterHeight(this.container);
    this.preAlign('top-right');
    this.setContainerPosition(left, top);
  }

  alignTopLeft() {
    const hostOffset = this.getHostOffset();
    const left = hostOffset.left - IadDomHandler.getOuterWidth(this.container);
    const top = hostOffset.top - IadDomHandler.getOuterHeight(this.container);
    this.preAlign('top-left');
    this.setContainerPosition(left, top);
  }

  protected setContainerPosition(left: number, top: number) {
    this.container.style.left = left + 'px';
    this.container.style.top = top + 'px';
  }
}
