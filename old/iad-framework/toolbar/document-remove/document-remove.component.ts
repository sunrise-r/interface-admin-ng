import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { TranslateService } from '@ngx-translate/core';

import { FormErrorsStringifyService } from 'app/shared';
import { FloatingWindowInnerInterface } from 'app/layouts';
import { Operation } from 'app/customize/document-resolutions/operation.model';
import { Resolution } from 'app/customize/document-resolutions/resolution.model';

import { ActualSelectionModel } from '../../data-table';

import { DocumentRemoveService } from './document-remove.service';

@Component({
    selector: 'jhi-document-path',
    templateUrl: './document-remove.component.html',
    providers: [FormErrorsStringifyService],
    styles: ['.document-operations { height: calc(100% - 47px); }', '.controls-wrapper { height: 47px; }']
})
export class DocumentRemoveComponent implements OnInit, FloatingWindowInnerInterface {
    /**
     * Форма
     */
    actionsForm: FormGroup;

    /**
     * Ошибки формы
     */
    errors: string;

    /**
     * Выбранная строка
     */
    selection: ActualSelectionModel;

    /**
     * Операции
     */
    operations: Operation[];

    /**
     * Состояние отправки
     */
    sending: boolean;

    /**
     * Наблюдатель для закрытия родительского окна-компонента
     */
    closeObserver: Subject<boolean> = new Subject<boolean>();

    constructor(
        private removeService: DocumentRemoveService,
        private eventManager: JhiEventManager,
        private formErrorsStringifier: FormErrorsStringifyService,
        private translateService: TranslateService
    ) {}

    ngOnInit() {
        this.actionsForm = new FormGroup({});
        this.formErrorsStringifier.errors.subscribe(errors => {
            this.errors = errors;
        });
        this.emulateOperation().then((operation: Operation) => (this.operations = [operation]));
    }

    /**
     * Отмена и закрытие окна
     */
    close() {
        this.sending = false;
        this.closeObserver.next(true);
    }

    /**
     * Отправка формы принятия резолюции
     */
    onSubmit() {
        this.sending = true;
        this.removeService.remove(this.getSelectionId()).subscribe(
            () => {
                this.eventManager.broadcast({ name: 'onRemoved' });
                this.close();
            },
            () => {}
        );
    }

    /**
     * Возвращает id текущей выделенной записи
     */
    private getSelectionId() {
        return this.selection.documentDTO && this.selection.documentDTO.id ? this.selection.documentDTO.id : this.selection.selection.id;
    }

    /**
     * Создаёт операцию
     */
    private emulateOperation(): Promise<Operation> {
        return this.translateService
            .get('partnerGatewayApp.partnerDocuments.removeDocument')
            .toPromise()
            .then(translation => {
                const operation = new Operation();
                const resolution = new Resolution();
                resolution.description = translation;
                operation.resolutions = [resolution];
                operation.type = 'delete';
                return operation;
            });
    }
}
