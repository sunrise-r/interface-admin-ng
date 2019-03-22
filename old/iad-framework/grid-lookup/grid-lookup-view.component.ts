import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { JhiEventManager } from 'ng-jhipster';

import { AutoUnsubscribe } from 'app/shared';
import {
    ActualSelectionModel,
    DocumentListProjection,
    IADPresentation,
    IProjectionDefaultFilter,
    PRESENTATION_TYPE,
    PresentationLoader,
    ProjectionDefaultFilter
} from '../';

import { ProjectionTableComponent } from '../projection-table';
import { ToolbarAction } from '../toolbar';

import { LookupAdd, LookupSelect, onLookupAdd, onLookupSelect } from './';
import { statementTypes } from 'app/elastic';
import { ContextAware } from 'app/customize/dynamic-form/context-aware';

export const PARTNER_SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GridLookupViewComponent),
    multi: true
};

@Component({
    selector: 'jhi-grid-lookup-view',
    templateUrl: './grid-lookup-view.component.html',
    providers: [PARTNER_SELECT_VALUE_ACCESSOR]
})
@AutoUnsubscribe
export class GridLookupViewComponent implements ControlValueAccessor, ContextAware, OnInit, OnDestroy {
    /**
     * Включает режим multiple
     */
    @Input() multiple: boolean;

    /**
     * Название инпута
     */
    @Input() label: any;

    /**
     * Код презентации для запроса
     */
    @Input() presentationCode: string;

    /**
     * Код проекции для выбора значений
     */
    @Input() lookupSourceProjectionCode = 'lookupSourceListProjection';

    /**
     * Код проекции для отображения выбранных значений
     */
    @Input() lookupViewProjectionCode = 'lookupViewListProjection';

    /**
     * Флаг "Только для чтения"
     * TODO ни на что не влияет на момент 13,11,2018
     */
    @Input() readonly: any;

    /**
     * Флаг "Отключить дропдаун"
     */
    @Input() disableDropdown: boolean;

    /**
     * Flag to check if SOURCE grid filter should be showed by default
     */
    @Input() showFilter: boolean;

    @Input() context: any = null;

    /**
     * Данные Таблицы для отображения пользователям
     */
    @Input()
    set items(items: any[]) {
        this._items = items;
        this.setInputValues(items);
    }

    get items(): any[] {
        return this._items;
    }

    /**
     * Данные для таблицы lookupSource
     */
    @Input() sourceItems;

    /**
     * Field to select value from selection.
     * id by default
     */
    @Input('valueField')
    set valueField(valueField: string) {
        this._valueField = valueField;
    }

    get valueField(): string {
        return this._valueField || 'id';
    }

    /**
     * используемый грид
     */
    @ViewChild(ProjectionTableComponent) dataTable: ProjectionTableComponent;

    /**
     * Модель текущей презентации
     */
    presentation: IADPresentation;

    /**
     * Модель текущей презентации
     */
    projection: DocumentListProjection;

    /**
     * Опции, выбранные в режиме single
     */
    selectedOption: any;

    /**
     * Опции, выбранные в режиме multiple
     */
    selectedOptions: any[];

    /**
     * Выбранная строка view
     */
    viewSelection: any;

    /**
     * Данные Таблицы для отображения пользователям
     */
    private _items: any[];

    /**
     * Field to select value from selection.
     * id by default
     */
    private _valueField: string;

    presentationServiceSubscription: Subscription;

    /**
     * Коллбеки, необходимые для работы класса
     * @param event
     */
    onChange = (event: any) => {};
    onTouched = () => {};

    constructor(private presentationService: PresentationLoader, private eventManager: JhiEventManager) {}

    ngOnInit(): void {
        this.presentationServiceSubscription = this.presentationService
            .load(this.presentationCode, PRESENTATION_TYPE.ENTITY)
            .subscribe((presentation: IADPresentation) => {
                if (JSON.stringify(presentation) !== '{}' && presentation) {
                    this.presentation = presentation;
                    this.projection = this.filterProjectionByCode(this.lookupViewProjectionCode, this.presentation.projections);
                    this.subscribeLookupSourceSelectionEvent(this.presentation);
                } else {
                    console.error('Presentation ' + this.presentationCode + ' not loaded');
                }
            });
    }

    ngOnDestroy(): void {}

    /**
     * Set the function to be called
     * when the control receives a change event.
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Set the function to be called
     * when the control receives a touch event.
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /**
     * Set the function to be called
     * when the control disabled property changes.
     */
    setDisabledState(isDisabled: boolean): void {}

    /**
     * Write a new value to the element.
     * Это именно запись значения извне, но вызываться должна и при выборе значений из сурса лукапа
     */
    writeValue(obj: any): void {
        if (!obj) {
            return;
        }
        if (this.multiple) {
            this.selectedOptions = obj;
            this.onChange(this.selectedOptions);
        } else {
            this.selectedOption = obj[0];
            this.onChange(this.selectedOption);
        }
    }

    /**
     * Обработчик события Выбрана строка таблицы
     * @param event
     */
    onSelectViewItem(event: ActualSelectionModel) {
        this.viewSelection = event.selection;
    }

    /**
     * Клик на экшн в тулбаре
     * @param action
     */
    onActionClicked(action: ToolbarAction) {
        if (action.code === 'add') {
            const sourceProjection = this.getSourceProjection(this.presentation.projections);
            if (sourceProjection) {
                const sourceEvent = this.getLookupSourceEventName(this.presentation, sourceProjection);
                this.eventManager.broadcast(<LookupAdd>{
                    name: onLookupAdd,
                    content: {
                        lookupSourceEventName: sourceEvent,
                        presentationCode: this.presentation.code,
                        projection: sourceProjection,
                        sourceItems: this.filterSourceItems(),
                        filter: this.generateSourceFilter(sourceProjection),
                        showFilter: this.showFilter,
                        context: this.context
                    }
                });
            }
        } else if (action.code === 'remove') {
            const items = this.removeViewGridItem(this.viewSelection);
            this.setInputValues(items);
            this.dataTable.emitUnSelectItem();
            this.viewSelection = undefined;
        }
    }

    /**
     * Подписывается на событие "Запись выбрана" в лукап сурсе
     */
    private subscribeLookupSourceSelectionEvent(presentation: IADPresentation): Subscription | undefined {
        const sourceProjection = this.getSourceProjection(presentation.projections);
        if (sourceProjection) {
            const sourceEvent = this.getLookupSourceEventName(presentation, sourceProjection);
            return this.eventManager.subscribe(sourceEvent, (event: LookupSelect) => {
                const items = this.addViewGridItem(event.content);
                this.setInputValues(items);
            });
        }
    }

    /**
     * Добалвем значения непосредственно инпута
     * @param items
     */
    private setInputValues(items: any) {
        const values = items.map(item => item[this.valueField]);
        this.writeValue(values);
        this.onTouched();
    }

    /**
     * Добавление айтемов при выборе их из лукап-сурса
     * @param item
     */
    private addViewGridItem(item: any): any {
        const items = (this.multiple ? this.items : []) || [];
        items.push(item);
        this.items = items;
        return this.items;
    }

    /**
     * Удаление айтема из лукап-вью
     * @param selection
     */
    private removeViewGridItem(selection: any): any {
        this.items = this.items.filter(item => item !== selection);
        return this.items;
    }

    /**
     * Возвращает название события выбора записи в ресурсе лукапа
     * @param presentation
     * @param sourceProjection
     */
    private getLookupSourceEventName(presentation: IADPresentation, sourceProjection: DocumentListProjection): string {
        return [onLookupSelect, presentation.code, sourceProjection.code].join('.');
    }

    /**
     * Возвращает проекцию ресурса лукапа
     */
    private getSourceProjection(projections: DocumentListProjection[]): DocumentListProjection {
        return this.filterProjectionByCode(this.lookupSourceProjectionCode, projections);
    }

    /**
     * Ищет проекцию по коду
     * @param code
     * @param projections
     */
    private filterProjectionByCode(code: string, projections: DocumentListProjection[]): DocumentListProjection {
        return projections.find((projection: DocumentListProjection) => {
            return projection.code.indexOf(code) !== -1;
        });
    }

    /**
     * Отфильтровывает записи, не выбранные в lookupView
     */
    private filterSourceItems() {
        return this.sourceItems.filter(item => this.items.indexOf(item) === -1);
    }

    /**
     * Создаёт фильтр по this.valueField выбранных записей
     */
    private generateSourceFilter(sourceProjection: DocumentListProjection): IProjectionDefaultFilter[] {
        let filter =
            this.items.length > 0 && this.multiple
                ? [new ProjectionDefaultFilter(this.valueField, this.items.map(item => item[this.valueField]), statementTypes.notIn)]
                : [];
        if (sourceProjection.filters && sourceProjection.filters.length > 0) {
            filter = filter.concat(sourceProjection.filters.map(_filter => new ProjectionDefaultFilter(_filter.field, _filter.values)));
        }
        return filter;
    }
}
