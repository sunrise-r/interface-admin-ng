import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, TemplateRef } from '@angular/core';
import { ToolbarAction } from '../../toolbar/models/toolbar-action.model';
import { Subject } from 'rxjs';

@Component({
    selector: 'jhi-table-toolbar',
    templateUrl: './table-toolbar.component.html'
})
export class TableToolbarComponent implements OnInit, OnChanges {
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
    @Input() leftActions: ToolbarAction[][];

    /**
     * Включить функции поиска
     */
    @Input() filterEnabled: boolean;

    /**
     * Событие очистки фильтра
     */
    @Input() deactivateActionButton: Subject<{ code: string }>;

    /**
     * Шаблон дополнения к правой части панели тулбара
     */
    @Input() rightAddonTemplate: TemplateRef<any>;

    /**
     * Нажата кнопка в тулбаре
     */
    @Output() actionClicked: EventEmitter<ToolbarAction> = new EventEmitter<ToolbarAction>();

    /**
     * Default actions
     */
    // @Input()
    rightActions: ToolbarAction[][] = [
        [
            new ToolbarAction('columns', true, 'list', false),
            new ToolbarAction('columnFilter', true, 'filter', false),
            new ToolbarAction('search', true, 'search', false),
            new ToolbarAction('clear', false, 'clear', false)
        ]
    ];

    ngOnInit(): void {
        this.rightActions = this.updateDefaultActionsOptions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('deactivateActionButton' in changes && this.deactivateActionButton) {
            this.deactivateActionButton.subscribe(toggle => {
                let action = this.findAction(toggle, this.leftActions);
                if (!action) {
                    action = this.findAction(toggle, this.rightActions);
                }
                if (action) {
                    action.active = false;
                }
            });
        }
    }

    /**
     * //onToolbarActionClicked
     * Кидаем наверх кликнутую кнопку
     * @param event
     */
    onActionInvoke(event: { nativeEvent: Event; action: ToolbarAction }) {
        switch (event.action.code) {
            case 'columns':
                this.columnSelectorActive = !this.columnSelectorActive;
                break;
            case 'columnFilter':
                this.filterActive = !this.filterActive;
                this.searchActive = false;
                break;
            case 'search':
                this.searchActive = !this.searchActive;
                this.filterActive = false;
                break;
            case 'clear':
                this.filterActive = false;
                this.searchActive = false;
                break;
        }
        this.updateDefaultActionsOptions();
        this.actionClicked.emit(event.action);
    }

    /**
     * Find action in group
     * @param term
     * @param actions
     */
    private findAction(term, actions: ToolbarAction[][]): ToolbarAction {
        return this.expandActionGroup(actions).find(action => action.code === term.code);
    }

    /**
     * Expand actions groups to plain list of toolbar actions
     * @param actions
     */
    private expandActionGroup(actions: ToolbarAction[][]): ToolbarAction[] {
        return actions.reduce((acu, group) => acu.concat(group), []);
    }

    /**
     * Manage default toolbar actions
     */
    private updateDefaultActionsOptions(): ToolbarAction[][] {
        this.expandActionGroup(this.rightActions).forEach((action: ToolbarAction) => {
            switch (action.code) {
                case 'columns':
                    action.visible = this.showColumnSelector;
                    action.active = this.columnSelectorActive;
                    break;
                case 'columnFilter':
                    action.visible = this.filterEnabled;
                    action.active = this.filterActive;
                    break;
                case 'search':
                    action.visible = this.filterEnabled;
                    action.active = this.searchActive;
                    break;
                case 'clear':
                    action.visible = this.filterEnabled;
                    action.disabled = !this.filterActive && !this.searchActive;
                    break;
            }
        });
        return this.rightActions;
    }
}
