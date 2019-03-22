import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Subject, Subscription } from 'rxjs';

import { AutoUnsubscribe, StringHelperService } from 'app/shared';
import { DATA_DEPENDENCY_LEVEL, DocumentListProjection, IADPresentation, PresentationLoader, SELECT_ACTION } from '../';
import { ActualSelectionEvent, ActualSelectionModel, onActualSelection } from '../data-table';
import { ToolbarAction } from '../toolbar';
import { operationEdit } from 'app/iad-framework/operations/operations.constants';
import { ToolbarDropdownComponent } from 'app/iad-framework/toolbar/toolbar-dropdown/toolbar-dropdown.component';
import { SelectionBufferService } from 'app/iad-framework/data-table/services/selection-buffer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateStorageService } from 'app/core';

import { constantFieldNames } from 'app/iad-framework/toolbar/operations-list/operations-list.constants';

@Component({
    selector: 'jhi-operations',
    templateUrl: './operations.component.html'
})
@AutoUnsubscribe
export class OperationsComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('creationFormList') creationFormList: ToolbarDropdownComponent;

    /**
     * В таблице была выбрна строка
     */
    @Input() selection: ActualSelectionModel;

    /**
     * Нажата какая-либо кнопка в тулбаре
     */
    @Output() actionClicked: EventEmitter<ToolbarAction> = new EventEmitter<ToolbarAction>();

    /**
     * В таблице была выбрна строка
     */
    @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

    /**
     * #1226 Provides p-panel toggle event for upper component
     */
    @Output() afterToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * сабжект снятия выделения
     */
    unSelectRow: Subject<boolean> = new Subject<boolean>();

    /**
     * Проекция для окна операций
     */
    projection: DocumentListProjection;

    /**
     * Список операций по текущему документу
     */
    operations: any[] = [];

    private subscription: Subscription;

    constructor(
        private presentationService: PresentationLoader,
        private eventManager: JhiEventManager,
        private selectionBufferService: SelectionBufferService,
        private router: Router,
        private stateStorageService: StateStorageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.presentationService.loadCommonPresentation().subscribe((presentation: IADPresentation) => {
            this.projection = presentation.projections.find((projection: DocumentListProjection) => projection.code === 'operations');
        });
        this.subscription = this.eventManager.subscribe(onActualSelection, (event: ActualSelectionEvent) => {
            if (
                !event.content ||
                event.content.type === DATA_DEPENDENCY_LEVEL.OPERATION ||
                event.content.type === DATA_DEPENDENCY_LEVEL.REFERENCE
            ) {
                return;
            }
            this.unSelectRow.next(true);
            if (event.content.action === SELECT_ACTION.SELECT) {
                this.operations = this.initOperations(event.content);
            } else {
                this.operations = [];
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('selection' in changes) {
            this.initOperations(this.selection);
        }
    }

    ngOnDestroy(): void {}

    /**
     * Инициализирует список операций
     * @param selection
     */
    initOperations(selection: ActualSelectionModel): any[] {
        return selection && selection.properties && 'operations' in selection.properties ? selection.properties.operations : [];
    }

    /**
     * #1226 After panel toggle event
     * @param $event
     */
    onAfterToggle($event: boolean) {
        this.afterToggle.emit($event);
    }

    /**
     * Обработчик события Выбрана строка таблицы
     * @param event
     */
    onSelectItem(event: ActualSelectionModel) {
        this.selection = event;
        this.selectedItem.next(event);
    }

    /**
     * Произведён клик в тулбаре
     */
    onActionClicked(action: ToolbarAction) {
        switch (action.code) {
            case operationEdit:
                this.stateStorageService.storeUrl(this.router.url);
                const standartOperations = ['new', ...constantFieldNames];
                const standartOperation = standartOperations.find(operation => {
                    return this.selection.selection.operationType.toLowerCase() === operation.toLowerCase();
                });
                let urlSections: string[] = [];
                if (standartOperation) {
                    urlSections = [
                        StringHelperService.camelToKebab(this.selectionBufferService.getClassName()),
                        'edit-operation',
                        StringHelperService.camelToKebab(standartOperation)
                    ];
                } else {
                    urlSections = ['edit-correction', this.selection.selection.operationType];
                }
                urlSections = urlSections.concat([this.selection.selection.id]);
                this.router.navigate(urlSections, { relativeTo: this.activatedRoute }).catch(fail => console.log(fail));
        }

        this.actionClicked.emit(action);
    }
}
