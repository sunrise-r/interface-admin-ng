import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { FormErrorsStringifyService } from 'app/shared';
import { FloatingWindowInnerInterface } from 'app/layouts';
import { Operation } from 'app/customize/document-resolutions/operation.model';

import { DATA_DEPENDENCY_LEVEL } from '../../';
import { ActualSelectionModel } from '../../data-table';

import { DocumentPathLoadService } from './document-path-load.service';

@Component({
    selector: 'jhi-document-path',
    templateUrl: './document-path.component.html',
    providers: [FormErrorsStringifyService],
    styles: ['.document-operations { height: calc(100% - 47px); }', '.controls-wrapper { height: 47px; }']
})
export class DocumentPathComponent implements OnInit, FloatingWindowInnerInterface {
    /**
     * Выбранная строка
     */
    selection: ActualSelectionModel;

    /**
     * Тип пути - операция или документ
     */
    pathType: DATA_DEPENDENCY_LEVEL;

    /**
     * Операции
     */
    operations: Operation[];

    /**
     * Наблюдатель для закрытия родительского окна-компонента
     */
    closeObserver: Subject<boolean> = new Subject<boolean>();

    constructor(private pathLoadService: DocumentPathLoadService) {}

    ngOnInit() {
        this.pathLoadService
            .load(this.getSelectionId(), this.pathType)
            .toPromise()
            .then((response: HttpResponse<Operation[] | Operation>) => {
                this.operations = Array.isArray(response.body) ? response.body : [response.body];
            });
    }

    /**
     * Отмена и закрытие окна
     */
    close() {
        this.closeObserver.next(true);
    }

    /**
     * Возвращает id текущей выделенной записи
     */
    private getSelectionId() {
        return this.selection.documentDTO && this.selection.documentDTO.id ? this.selection.documentDTO.id : this.selection.selection.id;
    }
}
