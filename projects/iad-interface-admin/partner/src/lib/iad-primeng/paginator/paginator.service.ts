import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { onInfiniteScroll } from '../models';
import {IadEventManager} from '../../services/event-manager.service';

@Injectable()
export class PaginatorService {
    /**
     * Total records
     */
    totalRecords = 0;
    /**
     * Rows offset
     */
    first = 0;
    /**
     * Rows per page
     */
    rows = 0;
    /**
     * Смена страницы
     */
    pageChange: Subject<any> = new Subject();
    /**
     * Сброс
     */
    firstReset: Subject<number> = new Subject();

    /**
     * Последний запрос прокрутки страницы
     */
    lastScroll = 0;

    constructor(private eventManager: IadEventManager) {}

    /**
     * @param totalRecords
     * @param first
     * @param rows
     * @return PaginatorService
     */
    init(totalRecords: number, first: number, rows: number) {
        this.totalRecords = totalRecords;
        this.first = first;
        this.rows = rows;

        this.eventManager.subscribe(onInfiniteScroll, event => {
            const sec: number = new Date().getTime();
            if (sec > this.lastScroll + 50) {
                this.lastScroll = sec;
                this.changePageToNext();
            }
        });
        return this;
    }

    isFirstPage() {
        return this.getPage() === 0;
    }

    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }

    getPageCount() {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    }

    changePage(p: number) {
        const pc = this.getPageCount();

        if (p >= 0 && p < pc) {
            this.first = this.rows * p;
            this.pageChange.next({
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            });
        }
    }

    getPage(): number {
        return Math.floor(this.first / this.rows);
    }

    changePageToFirst() {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
    }

    changePageToPrev() {
        this.changePage(this.getPage() - 1);
    }

    changePageToNext() {
        this.changePage(this.getPage() + 1);
    }

    changePageToLast() {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
    }

    resetAll() {
        this.first = 0;
        this.totalRecords = 0;
        this.rows = 0;
    }

    /**
     * Сбрасывает offset Для первой страницы
     */
    resetFirst() {
        this.first = 0;
        this.firstReset.next(this.first);
    }
}
