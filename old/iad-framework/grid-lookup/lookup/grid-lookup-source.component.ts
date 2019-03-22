import { Component, OnInit, ElementRef, Renderer2, Input, OnDestroy } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { AutoUnsubscribe, DomHelperService } from 'app/shared';
import { IProjectionDefaultFilter, DocumentListProjection, ActualSelectionModel } from '../../';
import { ToolbarAction } from '../../toolbar';
import { LookupAdd, LookupSelect, onLookupAdd } from '../';

@Component({
    selector: 'jhi-grid-lookup-source',
    templateUrl: './grid-lookup-source.component.html'
})
@AutoUnsubscribe
export class GridLookupSourceComponent implements OnInit, OnDestroy {
    /**
     * Селектор соседнего компонента
     */
    @Input() siblingSelector = '.content-flex';

    /**
     * Модель текущей презентации
     */
    presentationCode: string;

    /**
     * Модель текущей презентации
     */
    projection: DocumentListProjection;

    /**
     * Выбранное значение
     */
    selection: any;

    /**
     * Flag to check if SOURCE grid filter should be showed by default
     */
    showFilter: boolean;

    /**
     * Данные для lookup source
     */
    sourceItems: any[] = [];

    /**
     * Фильтр по категории операций
     */
    filter: IProjectionDefaultFilter[];

    /**
     * Предыдущее свойство display текущего компонента
     */
    private defaultLookupDisplay: string;

    /**
     * Предыдущее свойство display соседнего компонента
     */
    private defaultSiblingDisplay: string;

    /**
     * Соседний компонент
     */
    private sibling;

    /**
     * Название события выбора записи для однозначной связки с лукап-вью
     */
    private lookupSourceEventName;

    /**
     * Контекст открытия лукапа
     */
    context: any;

    constructor(
        private eventManager: JhiEventManager,
        private el: ElementRef,
        private renderer: Renderer2,
        private domHelper: DomHelperService
    ) {}

    ngOnInit() {
        this.sibling = this.domHelper.sibling(this.el.nativeElement, this.siblingSelector);
        this.defaultLookupDisplay = this.el.nativeElement.style.display;
        this.defaultSiblingDisplay = this.sibling.style.display;
        this.eventManager.subscribe(onLookupAdd, (event: LookupAdd) => {
            this.projection = event.content.projection;
            this.presentationCode = event.content.presentationCode;
            this.lookupSourceEventName = event.content.lookupSourceEventName;
            this.sourceItems = event.content.sourceItems ? event.content.sourceItems : [];
            if (event.content.filter && event.content.filter.length > 0) {
                this.filter = event.content.filter;
            } else {
                this.filter = null;
            }
            this.showFilter = event.content.showFilter;

            console.log(JSON.stringify(event));
            this.open(event.content.context);
        });
        this.hideLookupCmp();
    }

    ngOnDestroy(): void {}

    /**
     * Скрывает сиблинг и открывает лукап
     */
    open(context: any) {
        this.context = context;
        this.renderer.setStyle(this.el.nativeElement, 'display', this.defaultLookupDisplay);
        this.renderer.setStyle(this.sibling, 'display', 'none');
    }

    /**
     * Скрывает лукап и открывает сиблинг
     */
    close() {
        this.hideLookupCmp();
        this.projection = undefined;
        this.presentationCode = undefined;
        this.lookupSourceEventName = undefined;
        this.selection = undefined;
        this.renderer.setStyle(this.sibling, 'display', this.defaultSiblingDisplay);
    }

    /**
     * Скрывает компонент лукапа
     */
    hideLookupCmp() {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }

    /**
     * В таблице выбрана строка
     * @param event
     */
    onSelectSourceItem(event: ActualSelectionModel): void {
        this.selection = JSON.stringify(event.documentDTO) !== '{}' ? event.documentDTO : event.selection;
    }

    /**
     * Клик на экшн в тулбаре
     * @param action
     */
    onActionClicked(action: ToolbarAction) {}

    /**
     * Добавление выбранных в слекте записей
     */
    add() {
        if (!this.selection) {
            console.error('selection is undefined');
            return;
        }
        this.eventManager.broadcast(<LookupSelect>{
            name: this.lookupSourceEventName,
            content: this.selection
        });
        this.close();
    }
}
