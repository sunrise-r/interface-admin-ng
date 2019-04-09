import { Directive, ElementRef, AfterViewInit, NgZone, Input } from '@angular/core';
import { Tooltip } from 'primeng/components/tooltip/tooltip';
import {IadDomHandler} from '../../../iad-primeng/dom/iad-dom-handler';
@Directive({
  selector: '[iadPTooltip]'
})
export class TooltipDirective extends Tooltip implements AfterViewInit {

  @Input('iadPTooltip')
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
    this.preAlign('bottom-right');
    const hostOffset = this.getHostOffset();
    const left = hostOffset.left + IadDomHandler.getOuterWidth(this.el.nativeElement);
    const top = hostOffset.top + IadDomHandler.getOuterHeight(this.el.nativeElement);
    this.setContainerPosition(left, top);
  }

  alignBottomLeft() {
    this.preAlign('bottom-left');
    const hostOffset = this.getHostOffset();
    const left = hostOffset.left - IadDomHandler.getOuterWidth(this.container);
    const top = hostOffset.top + IadDomHandler.getOuterHeight(this.el.nativeElement);
    this.setContainerPosition(left, top);
  }

  alignTopRight() {
    this.preAlign('top-right');
    const hostOffset = this.getHostOffset();
    const left = hostOffset.left + IadDomHandler.getOuterWidth(this.el.nativeElement);
    const top = hostOffset.top - IadDomHandler.getOuterHeight(this.container);
    this.setContainerPosition(left, top);
  }

  alignTopLeft() {
    this.preAlign('top-left');
    const hostOffset = this.getHostOffset(),
      left = hostOffset.left - IadDomHandler.getOuterWidth(this.container),
      top = hostOffset.top - IadDomHandler.getOuterHeight(this.container);
    this.setContainerPosition(left, top);
  }

  protected setContainerPosition(left: number, top: number) {
    this.container.style.left = left + 'px';
    this.container.style.top = top + 'px';
  }
}
