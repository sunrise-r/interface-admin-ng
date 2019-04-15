import {Component, Input, OnInit} from '@angular/core';
import {TableTdContentInterface} from './column-components.model';
import {IadGridColumn} from '../model/iad-grid-column.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {ConfirmationService} from 'primeng/primeng';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'iad-action-column',
  template: `<div style="text-align: center">
    <a [href]="editUrl"><fa-icon *ngIf="display('edit')" [icon]="'edit'" [size]="'2x'" style="color: dimgray"></fa-icon></a>
    <a (click)="showDeleteUserDialog()"><fa-icon *ngIf="display('delete')" [icon]="'trash'" [size]="'2x'" style="color: dimgray"></fa-icon></a>
  </div>`
})
export class ActionsColumnComponent implements TableTdContentInterface {
  col: IadGridColumn;
  selected: boolean;
  rowData: any;
  disabled: boolean;
  doRefresh: Subject<any> = null;

  constructor(private http: HttpClient, private confirmationService: ConfirmationService) { }

  display(action: string): boolean {
    return this.col.displayFormat.split('|').find(e => e === action) !== undefined;
  }

  get editUrl() {
    const editUrlParam: string = <string>this.col.properties['editUrl'];
    return '/#' + (editUrlParam[0] === '\/' ? '' : '\/') + editUrlParam
      + (editUrlParam[editUrlParam.length - 1] === '\/' ? '' : '\/') + this.rowData['id'];
  }

  deleteUser() {
    let deleteUrl: string = <string>this.col.properties['deleteUrl'];
    if (!deleteUrl.endsWith('\/')) { deleteUrl += '\/'; }
    this.http.delete(deleteUrl + this.rowData['id'])
      .subscribe(response => this.doRefresh.next(), error => {});
  }

  showDeleteUserDialog() {
    this.confirmationService.confirm({
      message: null,
      key: 'deleteTableRecord',
      accept: () => this.deleteUser()
    });
  }
}
