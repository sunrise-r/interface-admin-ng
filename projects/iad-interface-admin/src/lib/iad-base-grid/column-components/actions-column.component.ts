import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/primeng';
import { IadEventManager } from 'iad-interface-admin/core';

import { TableTdContentInterface } from '../model/column-components.model';
import { IadGridColumn } from '../model/iad-grid-column.model';

@Component({
    selector: 'iad-action-column',
    styleUrls: ['./actions-column.component.scss'],
    template: `
        <div class="actions-column">
            <a *ngIf="display('edit')" [href]="editUrl">
                <iad-icon-outlet icon="fas edit" [size]="'1x'" [cssStyle]="{color: 'dimgray'}"></iad-icon-outlet>
            </a>
            <a *ngIf="display('delete')" (click)="showDeleteRecordDialog()">
                <iad-icon-outlet icon="fas trash" [size]="'1x'" [cssStyle]="{color: 'dimgray'}"></iad-icon-outlet>
            </a>
            <button class="btn" *ngIf="display('button')" (click)="broadcastButtonEvent()">
                {{translateButton ? (buttonTranslationCode | translate) : buttonName}}
            </button>
        </div>`
})
export class ActionsColumnComponent implements TableTdContentInterface {
    col: IadGridColumn;
    selected: boolean;
    rowData: any;
    disabled: boolean;

    constructor(private http: HttpClient, private confirmationService: ConfirmationService,
                private eventManager: IadEventManager) {
    }

    display(action: string): boolean {
        return this.col.displayFormat.split('|').find(e => e === action) !== undefined;
    }

    get editUrl() {
        if (!this.col.properties['editUrl']) {
            return '';
        }
        const editUrlParam: string = <string>this.col.properties['editUrl'];
        return '#' + (editUrlParam[0] === '\/' ? '' : '\/') + editUrlParam
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

    broadcastDeleteRecordConfirm() {
        let deleteUrl: string = <string>this.col.properties['deleteUrl'];
        if (!deleteUrl.endsWith('\/')) {
            deleteUrl += '\/';
        }
        this.http.delete(deleteUrl + this.rowData['id'])
            .subscribe(response => {
                this.eventManager.broadcast({
                    name: this.col.properties['projectionCode'] + '#recordDeleted',
                    content: this.rowData
                });
            }, error => {});
    }

    showDeleteRecordDialog() {
        this.confirmationService.confirm({
            message: null,
            key: 'delete#' + this.col.properties['projectionCode'],
            accept: () => this.broadcastDeleteRecordConfirm()
        });
    }

    broadcastButtonEvent() {
        this.eventManager.broadcast({name: this.col.properties['eventName'], content: this.rowData});
    }
}
