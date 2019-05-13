import {Component, Input, OnInit} from '@angular/core';
import {TableTdContentInterface} from './column-components.model';
import {IadGridColumn} from '../model/iad-grid-column.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {ConfirmationService} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'iad-chips-column',
  template: `<div>
    <p-chips [(ngModel)]="values" (ngModelChange)="valuesChanged()"></p-chips>
  </div>`
})
export class ChipsColumnComponent implements TableTdContentInterface, OnInit {
  col: IadGridColumn;
  selected: boolean;
  rowData: any;
  values: string[];
  disabled: boolean;
  doRefresh: Subject<any> = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.values = this.rowData[this.col.field];
  }

  valuesChanged() {
    let updateUrl: string = <string>this.col.properties['updateUrl'];
    if (!updateUrl.endsWith('\/')) { updateUrl += '\/'; }
    this.http.post(updateUrl + this.rowData['id'], this.values)
      .subscribe(() => {}, () => {});
  }
}
