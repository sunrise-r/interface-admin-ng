import {Component} from '@angular/core';
import {TableTdContentInterface} from './column-components.model';
import {IadGridColumn} from '../model/iad-grid-column.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'iad-action-column',
  template: `<div style="text-align: center">
    <a [href]="editUrl"><fa-icon *ngIf="display('edit')" [icon]="'edit'" [size]="'2x'" style="color: dimgray"></fa-icon></a>
    <a (click)="delete()"><fa-icon *ngIf="display('delete')" [icon]="'trash'" [size]="'2x'" style="color: dimgray"></fa-icon></a>
  </div>`
})
export class ActionsColumnComponent implements TableTdContentInterface {
  col: IadGridColumn;
  selected: boolean;
  rowData: any;
  disabled: boolean;

  constructor(private http: HttpClient) {}

  display(action: string): boolean {
    return this.col.displayFormat.split('|').find(e => e === action) !== undefined;
  }

  get editUrl() {
    const editUrlParam: string = <string>this.col.properties['editUrl'];
    return '/#' + (editUrlParam[0] === '\/' ? '' : '\/') + editUrlParam
      + (editUrlParam[editUrlParam.length - 1] === '\/' ? '' : '\/') + this.rowData['id'];
  }

  delete() {
    let deleteUrl: string = <string>this.col.properties['deleteUrl'];
    if (!deleteUrl.endsWith('\/')) { deleteUrl += '\/'; }
    this.http.delete(deleteUrl + this.rowData['id'])
      .subscribe(response => {}, error => {});
  }
}
