import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { forkJoin, Observable, Subscription, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { AutoUnsubscribe } from 'app/shared';
import {
    ActualSelectionModel,
    DATA_DEPENDENCY_LEVEL,
    IADPresentation,
    PresentationLoader,
    ProjectionsApiService,
    ProjectionTab,
    SELECT_ACTION,
    PresentationHelper
} from '../';

import { ActualSelectionChainService } from '../data-table';

import { ToolbarAction } from '../toolbar';

@Component({
    selector: 'jhi-references',
    templateUrl: './references.component.html',
    providers: [PresentationHelper]
})
@AutoUnsubscribe
export class ReferencesComponent implements OnInit, OnDestroy {
    /**
     * В таблице была выбрна строка
     */
    @Input() selection: any;

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
     * Список проекций для табов
     */
    tabProjections: ProjectionTab[];

    /**
     * Список операций по текущему документу
     */
    currentItemsSubject: Subject<any[]> = new Subject<any[]>();

    private dataSubscription: Subscription;

    private tabProjectionsSubscription: Subscription;

    constructor(
        private presentationService: PresentationLoader,
        private eventManager: JhiEventManager,
        private projectionsApiService: ProjectionsApiService,
        private presentationHelper: PresentationHelper,
        private dataPreviewChainService: ActualSelectionChainService
    ) {}

    ngOnInit() {
        this.dataSubscription = this.dataPreviewChainService.dataIsChanged.subscribe((selectionModel: ActualSelectionModel) => {
            if (
                (selectionModel && selectionModel.type === DATA_DEPENDENCY_LEVEL.REFERENCE) ||
                (!this.dataPreviewChainService.isDataChangedByType(DATA_DEPENDENCY_LEVEL.DOCUMENT) &&
                    !this.dataPreviewChainService.isDataChangedByType(DATA_DEPENDENCY_LEVEL.OPERATION))
            ) {
                return;
            }
            if (selectionModel && selectionModel.action === SELECT_ACTION.SELECT) {
                this.selection = selectionModel;
                this.initTabProjections(selectionModel.type);
            } else {
                this.tabProjections = undefined;
                this.currentItemsSubject.next([]);
            }
        });
    }

    ngOnDestroy() {}

    /**
     * Инициализирует проекции табов
     */
    initTabProjections(type: string) {
        if (this.tabProjectionsSubscription) {
            this.tabProjectionsSubscription.unsubscribe();
        }
        if (type === DATA_DEPENDENCY_LEVEL.DOCUMENT) {
            this.tabProjectionsSubscription = forkJoin(
                this.initReferredClassNameProjections(),
                this.initAdditionalProjections(type)
            ).subscribe(([referredProjections, additionalProjections]) => {
                this.tabProjections = referredProjections.concat(additionalProjections);
            });
        } else if (type === DATA_DEPENDENCY_LEVEL.OPERATION) {
            this.tabProjectionsSubscription = this.initAdditionalProjections(type).subscribe(additionalProjections => {
                this.tabProjections = additionalProjections;
            });
        }
    }

    /**
     * Инициализирует проекции по ClassName или type
     */
    initReferredClassNameProjections(): Observable<ProjectionTab[]> {
        const indices = this.initIndices();
        if (!indices) {
            return of([]);
        }
        return this.projectionsApiService.findProjectionsByIndexName(indices).pipe(
            map(response => {
                const tabProjections: ProjectionTab[] = [];
                if (response.body) {
                    Object.keys(response.body).forEach(key => tabProjections.push(new ProjectionTab(key, { ...response.body[key] })));
                }
                return tabProjections;
            })
        );
    }

    /**
     * Инициализирует и загружает проекции табов по умолчанию в зависимости от типа - документ, операция
     * @param type
     */
    initAdditionalProjections(type: string): Observable<ProjectionTab[]> {
        const commonObservable = this.presentationService.loadCommonPresentation();
        const projectionCodes = ['additionalDocumentsReferenceListProjection'];
        if (type === DATA_DEPENDENCY_LEVEL.OPERATION) {
            projectionCodes.push('resolutionsListProjection');
        }
        return commonObservable.pipe(
            map((body: IADPresentation) => {
                const tabProjections: ProjectionTab[] = [];
                projectionCodes.forEach(projectionCode => {
                    const projection = body.projections.find(proj => proj.code === projectionCode);
                    const projectionTabKey = 'common.' + projectionCode;
                    tabProjections.push(new ProjectionTab(projectionTabKey, { ...projection }));
                });
                return tabProjections;
            })
        );
    }

    /**
     * Инициализирует список значений для
     * @param selection
     * @param presentationCode
     */
    initCurrentItems(selection: ActualSelectionModel, presentationCode: string): any[] {
        const parsedPresentationCode = this.presentationHelper.cleanPresentationCode(presentationCode);
        let items = [];
        if (parsedPresentationCode.toLowerCase() === 'common') {
            const projectionCode = this.presentationHelper.cleanProjectionCode(presentationCode);
            if (selection.properties[projectionCode]) {
                items = selection.properties[projectionCode]; // resolutions, additionalDocuments
            }
        } else if (selection.referenceDocuments && selection.referenceDocuments[parsedPresentationCode]) {
            items = selection.referenceDocuments[parsedPresentationCode];
        }
        return items;
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
        this.selectedItem.next(event);
    }

    /**
     * Произведён клик в тулбаре
     */
    onActionClicked(action: ToolbarAction) {
        this.actionClicked.emit(action);
    }

    /**
     * Установка данных при переходе к проекции
     * @param presentationCode
     */
    onNavigateToProjection(presentationCode: string): void {
        this.currentItemsSubject.next(this.initCurrentItems(this.selection, presentationCode));
    }

    /**
     * Возвращает список индексов или null
     */
    private initIndices() {
        return this.selection.referenceDocuments ? Object.keys(this.selection.referenceDocuments) : null;
    }
}
