import { Component, Input, Output, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ToolbarAction } from '../../toolbar/models/toolbar-action.model';
import { Subject } from 'rxjs';

@Component({
    selector: 'iad-table-toolbar',
    templateUrl: './table-toolbar.component.html'
})
export class TableToolbarComponent implements OnInit {
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
    @Input() resetToggleableStatus: Subject<{ code: string }> = new Subject<{ code: string }>();

    /**
     * Шаблон дополнения к правой части панели тулбара
     */
    @Input() rightAddonTemplate: TemplateRef<any>;

    /**
     * Нажата кнопка в тулбаре
     */
    @Output()
    actionClicked: EventEmitter<{ nativeEvent: Event; action: ToolbarAction }> = new EventEmitter<{
        nativeEvent: Event;
        action: ToolbarAction;
    }>();

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

    /**
     * //onToolbarActionClicked
     * Кидаем наверх кликнутую кнопку
     * @param event
     */
    onActionInvoke(event: { nativeEvent: Event; action: ToolbarAction }) {
        const strategy = {
            columnFilter: () => {
                this.filterActive = !this.filterActive;
                this.searchActive = false;
            },
            search: () => {
                this.searchActive = !this.searchActive;
                this.filterActive = false;
            },
            clear: () => {
                this.filterActive = false;
                this.searchActive = false;
            }
        };
        if (event.action.code in strategy) {
            strategy[event.action.code]();
        }
        this.rightActions = this.updateDefaultActionsOptions();
        this.actionClicked.emit(event);
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
            const strategy = {
                columnFilter: () => {
                    action.visible = this.filterEnabled;
                    action.active = this.filterActive;
                },
                search: () => {
                    action.visible = this.filterEnabled;
                    action.active = this.searchActive;
                },
                clear: () => {
                    action.visible = this.filterEnabled;
                    action.disabled = !this.filterActive && !this.searchActive;
                }
            };
            if (action.code in strategy) {
                strategy[action.code]();
            }
        });
        return this.rightActions;
    }
}
