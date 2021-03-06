import { Component, ElementRef, Input, NgZone, AfterViewInit, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import { IadTableComponent } from './iad-table.component';
import { onInfiniteScroll, ResizeEvent } from './iad-table-models';

import { ScrollableView } from 'primeng/table';
import { IadDomHandler } from '../dom/iad-dom-handler';
import { Column } from 'primeng/shared';
import { IadEventManager } from '../../shared/services/event-manager.service';

@Component({
    selector: '[iadScrollableView]',
    templateUrl: './iad-scrollable-view.component.html'
})
export class IadScrollableViewComponent extends ScrollableView implements AfterViewInit, OnDestroy, OnInit {
    @Input('iadScrollableView') columns: Column[];

    /**
     * Позволяет определить статичные области таблицы
     */
    @Input() isStatic: boolean;

    /**
     * Входящее событие изменения размеров колонок
     */
    @Input() resize: Subject<ResizeEvent> = new Subject<ResizeEvent>();

    /**
     * #1226, 1271 Subject to notify table about height change
     */
    @Input() changeTableHeight: Subject<boolean> = new Subject<boolean>();

    /**
     * Enable Infinite Scroll
     */
    @Input() enableInfiniteScroll: boolean;

    /**
     * Flag to set custom perfect scroll instead of regular browser scroll
     */
    @Input() enablePerfectScroll: boolean;

    /**
     * Perfect scroll container when it is used
     */
    @ViewChild(InfiniteScrollDirective, { read: InfiniteScrollDirective }) infiniteScrollContainer: InfiniteScrollDirective;
    @ViewChild(InfiniteScrollDirective, { read: ElementRef }) infiniteScrollContainerRef: ElementRef;

    @ViewChild('scrollBody')
    set scrollBodyViewChild(scrollBodyViewChild: ElementRef) {
        // to avoid undefined set from parent
        if (scrollBodyViewChild) {
            this._scrollBodyViewChild = scrollBodyViewChild;
        }
    }
    get scrollBodyViewChild(): ElementRef {
        if (!this._scrollBodyViewChild && !this.frozen && this.infiniteScrollContainer && this.enablePerfectScroll) {
            const nativeScrollBody = IadDomHandler.findSingle(this.el.nativeElement, this.infiniteScrollContainer.infiniteScrollContainer);
            if (nativeScrollBody) {
                IadDomHandler.addClass(nativeScrollBody, 'ui-table-scrollable-body');
            }
            this._scrollBodyViewChild = new ElementRef(nativeScrollBody);
        }
        return this._scrollBodyViewChild;
    }

    /**
     * Контейнеры закреплённых колонок
     */
    frozenSiblingsScrollableBodies: Element[];

    private _scrollBodyViewChild: ElementRef;

    constructor(
        public dt: IadTableComponent,
        public el: ElementRef,
        public zone: NgZone,
        private eventManager: IadEventManager
    ) {
        super(dt, el, zone);
    }

    ngOnInit() {
        this.resize.subscribe((event: ResizeEvent) => {
            this.resizeMainContainer(event.frozenLeft, event.frozenRight);
        });
        this.changeTableHeight.subscribe(() => {
            this.zone.runOutsideAngular(() => {
                this.alignScrollBar();
            });
        });
    }

    ngAfterViewInit() {
        const scrollableWrapper = <HTMLElement>this.el.nativeElement.parentNode;
        this.dt.doRefresh.subscribe(() => {
            this.scrollTop();
            this.resizeMainContainer(this.dt.frozenWidth, this.dt.frozenRightWidth);
        });

        this.dt.onFilter.subscribe(() => this.scrollTop());
        this.dt.onSort.subscribe(() => this.scrollTop());

        if (!this.frozen) {
            const frozenViews = IadDomHandler.find(scrollableWrapper, '.ui-table-frozen-view');
            if (frozenViews && frozenViews.length) {
                IadDomHandler.addClass(this.el.nativeElement, 'ui-table-unfrozen-view');
                this.frozenSiblingsScrollableBodies = [];
                Array.from(frozenViews).forEach((frozenView: HTMLElement) => {
                    this.frozenSiblingsScrollableBodies.push(IadDomHandler.findSingle(frozenView, '.ui-table-scrollable-body'));
                });
            }
            this.resizeMainContainer(this.dt.frozenWidth, this.dt.frozenRightWidth);
        } else {
            if (!this.enablePerfectScroll) {
                this.scrollBodyViewChild.nativeElement.style.marginBottom = IadDomHandler.calculateScrollbarWidth() + 'px';
            }
            const scrollableViews = Array.from(scrollableWrapper.children).filter(
                (node: HTMLElement) => !node.classList.contains('ui-table-frozen-view')
            );

            if (scrollableViews[0]) {
                this.scrollableSiblingBody = IadDomHandler.findSingle(scrollableViews[0], '.ui-table-scrollable-body');
            }

            if (!this.isStatic) {
                const frozenLeftStaticSibling = this.el.nativeElement.previousElementSibling;
                if (frozenLeftStaticSibling && frozenLeftStaticSibling.classList.contains('frozen-static')) {
                    this.el.nativeElement.style.left = this.getStaticLeftWidth() + 'px';
                }

                const frozenRightStaticSibling = this.el.nativeElement.nextElementSibling;
                if (frozenRightStaticSibling && frozenRightStaticSibling.classList.contains('frozen-static')) {
                    this.el.nativeElement.style.right = this.getStaticRightWidth() + 'px';
                }
            }
        }

        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();

        if (this.dt.virtualScroll) {
            this.setVirtualScrollerHeight();
        }
    }

    onBodyScroll(event) {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }

        if (this.frozenSiblingsScrollableBodies) {
            this.frozenSiblingsScrollableBodies.forEach(frozenSiblingBody => {
                frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
            });
        }

        if (this.dt.virtualScroll) {
            const viewport = IadDomHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
            const tableHeight = IadDomHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
            const pageHeight = this.dt.virtualRowHeight * this.dt.rows;
            const virtualTableHeight = IadDomHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
            const pageCount = virtualTableHeight / pageHeight || 1;
            const scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top || '0';

            if (
                this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight ||
                this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop)
            ) {
                const page =
                    Math.floor(
                        this.scrollBodyViewChild.nativeElement.scrollTop * pageCount / this.scrollBodyViewChild.nativeElement.scrollHeight
                    ) + 1;
                this.dt.handleVirtualScroll({
                    page,
                    callback: () => {
                        this.scrollTableViewChild.nativeElement.style.top = (page - 1) * pageHeight + 'px';
                        if (this.frozenSiblingsScrollableBodies) {
                            this.frozenSiblingsScrollableBodies.forEach(frozenSiblingBody => {
                                (<HTMLElement>frozenSiblingBody.children[0]).style.top = this.scrollTableViewChild.nativeElement.style.top;
                            });
                        }
                    }
                });
            }
        }
    }

    /**
     * Обработчик события Infinite Scroll
     */
    onScroll() {
        this.eventManager.broadcast({
            name: onInfiniteScroll
        });
    }

    ngOnDestroy() {
        this.frozenSiblingsScrollableBodies = null;
        super.ngOnDestroy();
    }

    /**
     * Sets scrollable area height
     */
    setScrollHeight() {
        super.setScrollHeight();
        if (!this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            const scrollHeight = this.frozen
                && !this.enablePerfectScroll
                && this.scrollableSiblingBody
                && IadDomHandler.hasHorizontalScrollbar(<HTMLElement>this.scrollableSiblingBody)
                    ? IadDomHandler.calculateScrollbarWidth()
                    : 0;
            let headerHeight = 0;
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                headerHeight = IadDomHandler.getOuterHeight(this.scrollHeaderViewChild.nativeElement);
            }
            const height = 'calc(100% - ' + (headerHeight + scrollHeight) + 'px)';
            if (this.enablePerfectScroll && !this.frozen) {
                this.infiniteScrollContainerRef.nativeElement.style.maxHeight = height;
                this.infiniteScrollContainerRef.nativeElement.style.height = height;
                this.scrollBodyViewChild.nativeElement.style.maxHeight = '100%';
                this.scrollBodyViewChild.nativeElement.style.height = '100%';
            } else {
                this.scrollBodyViewChild.nativeElement.style.maxHeight = height;
                this.scrollBodyViewChild.nativeElement.style.height = height;
            }
        }
    }

    alignScrollBar() {
        if (!this.frozen) {
            const scrollBarWidth = this.hasVerticalOverflow() && !this.enablePerfectScroll ? IadDomHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';

            if(this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    }

    /**
     * Изменяет размер не-frozen контейнера
     * @param width
     * @param rightWidth
     */
    private resizeMainContainer(width?: string, rightWidth?: string) {
        const staticWidth = this.getStaticLeftWidth();
        const staticRightWidth = this.getStaticRightWidth();
        let _width: number;
        let widthDeduction = staticWidth + staticRightWidth;
        if (!this.frozen) {
            if (width) {
                _width = parseInt(width.replace('px', ''), 10);
                this.el.nativeElement.style.left = staticWidth + _width + 'px';
                widthDeduction += _width;
            }
            if (rightWidth) {
                widthDeduction += parseInt(rightWidth.replace('px', ''), 10);
            }
            this.el.nativeElement.style.width = 'calc(100% - ' + widthDeduction + 'px)';
        }
    }

    private getStaticLeftWidth(): number {
        return this.dt.staticFrozenWidth ? parseInt(this.dt.staticFrozenWidth.replace('px', ''), 10) : 0;
    }

    private getStaticRightWidth(): number {
        return this.dt.staticFrozenRightWidth ? parseInt(this.dt.staticFrozenRightWidth.replace('px', ''), 10) : 0;
    }

    /**
     * Прокручивает таблицу к верхнему краю
     */
    private scrollTop() {
        this.scrollBodyViewChild.nativeElement.scrollTop = 0;
    }
}
