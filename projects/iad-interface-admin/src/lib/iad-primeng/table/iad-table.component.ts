import {
  Component,
  ElementRef,
  Injectable,
  NgZone,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';
import { Table, TableService } from 'primeng/table';
import {BlockableUI} from 'primeng/api';

@Component({
    selector: 'iad-table',
    templateUrl: './iad-table.component.html',
    providers: [TableService, { provide: Table, useExisting: IadTableComponent }]
})
@Injectable()
export class IadTableComponent extends Table implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, BlockableUI {

    constructor(public el: ElementRef, public zone: NgZone, public tableService: TableService) {
        super(el, zone, tableService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
      super.ngOnDestroy();
    }
}
