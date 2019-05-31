import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {ConfirmationService} from 'primeng/primeng';
import { IadEventManager } from 'iad-interface-admin/core';

import {TableTdContentInterface} from './column-components.model';
import {IadGridColumn} from '../model/iad-grid-column.model';

@Component({
  selector: 'iad-action-column',
  template: `
    <div style="text-align: center">
      <a [href]="editUrl">
        <fa-icon *ngIf="display('edit')" [icon]="'edit'" [size]="'2x'" style="color: dimgray"></fa-icon>
      </a>
      <a (click)="showDeleteUserDialog()">
        <fa-icon *ngIf="display('delete')" [icon]="'trash'" [size]="'2x'" style="color: dimgray"></fa-icon>
      </a>
      <button class="btn" *ngIf="display('button')" (click)="broadcastButtonEvent()">{{translateButton ? (buttonTranslationCode | translate) : buttonName}}</button>
    </div>`
})
export class ActionsColumnComponent implements TableTdContentInterface {
  col: IadGridColumn;
  selected: boolean;
  rowData: any;
  disabled: boolean;
  doRefresh: Subject<any> = null;

  constructor(private http: HttpClient, private confirmationService: ConfirmationService,
              private eventManager: IadEventManager) { }

  display(action: string): boolean {
    return this.col.displayFormat.split('|').find(e => e === action) !== undefined;
  }

  get editUrl() {
    if (!this.col.properties['editUrl']) { return ''; }
    const editUrlParam: string = <string>this.col.properties['editUrl'];
    return '/#' + (editUrlParam[0] === '\/' ? '' : '\/') + editUrlParam
      + (editUrlParam[editUrlParam.length - 1] === '\/' ? '' : '\/') + this.rowData['id'];
  }

  get translateButton() {
    return !!this.col.properties['translatedButtonName'];
  }

  get buttonName() {
    return this.col.properties['buttonName'];
  }

  get buttonTranslationCode() {
    return this.col.properties['translatedButtonName'];
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
      key: ('delete#' + this.col.properties['projectionCode']).substr(0, 40),
      accept: () => this.deleteUser()
    });
  }

  broadcastButtonEvent() {
    this.eventManager.broadcast({ name: this.col.properties['eventName'], content: this.rowData['id'] });
  }
}
