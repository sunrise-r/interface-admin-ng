import { Directive, ElementRef, OnInit, HostListener, Renderer2 } from '@angular/core';
import { IadDomHandler } from '../dom/iad-dom-handler';
import { IadTableComponent } from '../table/iad-table.component';

/**
 * https://github.com/primefaces/primeng/issues/5429#issuecomment-407518667
 */
@Directive({
    selector: '[iadTableKeys]'
})
export class TableKeysDirective implements OnInit {
    constructor(
        private table: IadTableComponent,
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.el.nativeElement.tabIndex = 1;
        this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
    }

    @HostListener('keydown.ArrowUp', ['$event'])
    ArrowUp($event: KeyboardEvent) {
        $event.preventDefault();
        const next = this.getNextIndex(-1);
        if (next !== null && next !== undefined) {
            this.changeSelection($event, next);
            this.scroll(next);
        }
    }

    @HostListener('keydown.ArrowDown', ['$event'])
    ArrowDown($event: KeyboardEvent) {
        $event.preventDefault();
        const next = this.getNextIndex(1);
        if (next !== null && next !== undefined) {
            this.changeSelection($event, next);
            this.scroll(next);
        }
    }

    getNextIndex(num: number) {
        if (!this.table.selection) {
            return;
        }
        const i = this.currentSelectionIndex();
        const len = this.countOfItems();
        const next = i + num;
        return (num > 0 && next < len) || (num < 0 && next >= 0) ? next : null;
    }

    scroll(index: number): void {
        const scrollable = IadDomHandler.findParentByClassName(this.el.nativeElement, 'ui-table-scrollable-body');
        const selectedRow = <HTMLElement>this.el.nativeElement.children[index];
        let scrollableTop = scrollable.scrollTop + this.el.nativeElement.offsetTop;
        if (IadDomHandler.hasHorizontalScrollbar(this.el.nativeElement)) {
            scrollableTop -= IadDomHandler.calculateScrollbarWidth();
        }
        const scrollableBottom = scrollableTop + scrollable.offsetHeight;
        const rowTop = selectedRow.offsetTop;
        const rowBottom = rowTop + selectedRow.offsetHeight;

        if (scrollableBottom <= rowBottom) {
            scrollable.scrollTop = rowTop;
        } else if (scrollableTop > rowTop) {
            scrollable.scrollTop = rowBottom - scrollable.offsetHeight;
        }
    }

    private changeSelection($event: Event, next: number) {
        const rowData = this.table.value[next];
        this.table._selection = rowData;
        this.table.onRowSelect.emit({ originalEvent: $event, data: rowData, type: 'row' });
        this.table.updateSelectionKeys();
        this.table.selectionChange.emit(rowData);
        this.table.tableService.onSelectionChange();
    }

    private currentSelectionIndex(): number {
        return this.table.value.indexOf(this.table.selection);
    }

    private countOfItems(): number {
        return this.table.value.length;
    }
}
