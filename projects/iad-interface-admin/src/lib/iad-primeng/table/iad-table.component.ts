import {
  Component,
  ElementRef,
  Injectable,
  NgZone,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterContentInit, Input
} from '@angular/core';
import { Table, TableService } from 'primeng/table';
import {BlockableUI} from 'primeng/api';
import {LazyLoadData} from './iad-table-models';
import {ReplaySubject} from 'rxjs';

@Component({
    selector: 'iad-table',
    templateUrl: './iad-table.component.html',
    providers: [TableService, { provide: Table, useExisting: IadTableComponent }]
})
@Injectable()
export class IadTableComponent extends Table implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, BlockableUI {

    /**
     * Request to update table view
     */
    @Input() doRefresh: ReplaySubject<string>;

    constructor(public el: ElementRef, public zone: NgZone, public tableService: TableService) {
        super(el, zone, tableService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
      super.ngOnDestroy();
    }

    /**
     * Контент события для подгрузки данных onLazyLoad
     * @param clearData
     */
    createLazyLoadMetadata(clearData?: boolean): LazyLoadData {
      return {
        first: this.first,
        rows: this.virtualScroll ? this.rows * 2 : this.rows,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
        filters: this.filters,
        globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
        multiSortMeta: this.multiSortMeta,
        clearData: clearData === undefined ? true : clearData
      };
    }
}
