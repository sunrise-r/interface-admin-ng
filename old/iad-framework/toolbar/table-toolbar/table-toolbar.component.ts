import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ToolbarAction } from '../models/toolbar-action.model';
import { ActionToggle, clearFilter, toggleColumnSelector, toggleFilter, toggleSearch } from './toolbar-action-constants';
import { Subject } from 'rxjs';

const defaultActions = {
    columns: new ToolbarAction('columns', true, 'list', false),
    filter: new ToolbarAction('filter', true, 'filter', false),
    search: new ToolbarAction('search', true, 'search', false),
    clear: new ToolbarAction('clear', false, 'clear', false)
};

@Component({
    selector: 'jhi-table-toolbar',
    templateUrl: './table-toolbar.component.html'
})
export class TableToolbarComponent implements OnChanges {
    /**
     * Флаг "Фильтр активирован" (Фильтр по колонкам показан в таблице)
     * @type {boolean}
     */
    @Input() filterActive = false;

    /**
     * Флаг "Поиск активирован" (Поиск по всем колонкам показан в таблице)
     * @type {boolean}
     */
    @Input() searchActive = false;

    /**
     * Отображение контрола выбора колонок
     * @type {boolean}
     */
    @Input() columnSelectorActive = false;

    /**
     * Отображение контрола выбора колонок
     * @type {boolean}
     */
    @Input() showColumnSelector = true;

    /**
     * Доступные действия
     */
    @Input() actions: ToolbarAction[][];

    /**
     * Код проекции данных
     */
    @Input() projectionCode: string;

    /**
     * ключ настроек, идентификатор проекции/представления
     */
    @Input() groupSettingsKey: string;

    /**
     * Включить функции поиска
     */
    @Input() filterEnabled: boolean;

    /**
     * Событие очистки фильтра
     */
    @Input() deactivateActionButton: Subject<ActionToggle> = new Subject<ActionToggle>();

    /**
     * Нажата кнопка в тулбаре
     */
    @Output() actionClicked: EventEmitter<ToolbarAction> = new EventEmitter<ToolbarAction>();

    /**
     * Событие очистки фильтра
     */
    clearFilter: Subject<boolean> = new Subject<boolean>();

    /**
     * Default actions
     */
    defaultActions = defaultActions;

    ngOnChanges(changes: SimpleChanges): void {
        if ('deactivateActionButton' in changes && this.deactivateActionButton) {
            this.deactivateActionButton.subscribe(toggle => {
                let action: ToolbarAction;
                this.actions.forEach(actions => {
                    if (action) {
                        return false;
                    }
                    action = actions.find(_action => _action.code === toggle.code);
                });
                if (action) {
                    action.active = false;
                } else {
                    const actionKey = Object.keys(this.defaultActions).find(key => key === toggle.code);
                    if (actionKey) {
                        this.defaultActions[actionKey].active = false;
                    }
                }
            });
        }
    }

    /**
     * Событие клика по кнопке открытия фильтра
     */
    onToggleFilter() {
        this.filterActive = !this.filterActive;
        this.searchActive = false;
        this.actionClicked.emit(<ToolbarAction>{
            code: toggleFilter,
            value: this.filterActive
        });
    }

    /**
     * Событие клика по кнопке открытия фильтра
     */
    onToggleSearchPanel() {
        this.searchActive = !this.searchActive;
        this.filterActive = false;
        this.actionClicked.emit(<ToolbarAction>{
            code: toggleSearch,
            value: this.searchActive
        });
    }

    /**
     * рфтвдук ащк ещппду сщдгьт игещт сдшсл
     */
    onToggleColumnSelector() {
        this.columnSelectorActive = !this.columnSelectorActive;
        this.actionClicked.emit(<ToolbarAction>{
            code: toggleColumnSelector,
            value: this.columnSelectorActive
        });
    }

    /**
     * //onToolbarActionClicked
     * Кидаем наверх кликнутую кнопку
     * @param event
     */
    onActionInvoke(event: { nativeEvent: Event; action: ToolbarAction }) {
        this.actionClicked.emit(event.action);
    }

    /**
     * Сброс фильтров
     */
    onClearFilter() {
        this.filterActive = false;
        this.searchActive = false;
        this.clearFilter.next(true);
        this.actionClicked.emit(<ToolbarAction>{
            code: clearFilter,
            value: true
        });
    }
}
