import { Component, ElementRef, Input, NgZone, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IadTableComponent } from './iad-table.component';
import { JhiEvent } from 'app/shared';

import { onInfiniteScroll } from '../models';

import { ScrollableView } from 'primeng/table';
import { IadDomHandler } from '../dom/iad-dom-handler';
import { Column } from 'primeng/shared';

export interface ResizeEvent {
    frozenLeft: string;
    frozenRight?: string;
    central?: string;
}

@Component({
    selector: '[iadScrollableView]',
    templateUrl: './iad-scrollable-view.component.html',
    providers: [IadDomHandler]
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
     * #1372 interlayer viewChild
     */
    @ViewChild('scrollInterlayer') scrollInterlayerViewChild: ElementRef;

    /**
     * Контейнеры закреплённых колонок
     */
    frozenSiblingsScrollableBodies: Element[];

    constructor(
        public dt: IadTableComponent,
        public el: ElementRef,
        public domHandler: IadDomHandler,
        public zone: NgZone,
        private eventManager: JhiEventManager
    ) {
        super(dt, el, domHandler, zone);
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
        this.dt.askToRefresh.subscribe(() => {
            this.scrollTop();
            this.resizeMainContainer(this.dt.frozenWidth, this.dt.frozenRightWidth);
        });

        this.dt.onFilter.subscribe(() => this.scrollTop());
        this.dt.onSort.subscribe(() => this.scrollTop());

        if (!this.frozen) {
            const frozenViews = this.domHandler.find(scrollableWrapper, '.ui-table-frozen-view');
            if (frozenViews) {
                this.domHandler.addClass(this.el.nativeElement, 'ui-table-unfrozen-view');
                this.frozenSiblingsScrollableBodies = [];
                Array.from(frozenViews).forEach((frozenView: HTMLElement) => {
                    this.frozenSiblingsScrollableBodies.push(this.domHandler.findSingle(frozenView, '.ui-table-scrollable-body'));
                });
            }
            this.resizeMainContainer(this.dt.frozenWidth, this.dt.frozenRightWidth);
        } else {
            this.scrollBodyViewChild.nativeElement.style.marginBottom = this.domHandler.calculateScrollbarWidth() + 'px';
            const scrollableViews = Array.from(scrollableWrapper.children).filter(
                (node: HTMLElement) => !node.classList.contains('ui-table-frozen-view')
            );

            if (scrollableViews[0]) {
                this.scrollableSiblingBody = this.domHandler.findSingle(scrollableViews[0], '.ui-table-scrollable-body');
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
            const viewport = this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
            const tableHeight = this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
            const pageHeight = this.dt.virtualRowHeight * this.dt.rows;
            const virtualTableHeight = this.domHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
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
        this.eventManager.broadcast(<JhiEvent>{
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
            const scrollHeight =
                this.frozen && this.scrollableSiblingBody && this.domHandler.hasHorizontalScrollbar(<HTMLElement>this.scrollableSiblingBody)
                    ? this.domHandler.calculateScrollbarWidth()
                    : 0;
            let headerHeight = 0;
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                headerHeight = this.domHandler.getOuterHeight(this.scrollHeaderViewChild.nativeElement);
            }
            let interlayHeight = 0;
            if (this.scrollInterlayerViewChild && this.scrollInterlayerViewChild.nativeElement) {
                interlayHeight = this.domHandler.getOuterHeight(this.scrollInterlayerViewChild.nativeElement);
            }
            const height = 'calc(100% - ' + (headerHeight + scrollHeight + interlayHeight) + 'px)';
            this.scrollBodyViewChild.nativeElement.style.maxHeight = height;
            this.scrollBodyViewChild.nativeElement.style.height = height;
        }
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