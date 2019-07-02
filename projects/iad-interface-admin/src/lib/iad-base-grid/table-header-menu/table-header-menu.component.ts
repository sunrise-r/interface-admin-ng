import { Component, ElementRef, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { IadDomHandler, IadTableComponent, IadEventManager } from 'iad-interface-admin/core';

import { IAD_FROZEN_ACTION, IAD_FROZEN_POSITION, IadGridFrozenEvent } from '../base-grid/base-grid-freeze-column.model';

import { IadGridColumnInterface } from '../model/iad-grid-column.model';

export const onColumnHide = 'onColumnHide';
export const onLastColumnChecked = 'onLastColumnChecked';

export interface LastColumnChecked {
    name: string;
    content: {
        columnName: string;
        disabled: boolean;
    };
}

export interface TableMenuItem {
    icon: string;
    code: string;
}

const items = <TableMenuItem[]>[
    {
        icon: 'ui-grid-icon-sort-alt-up',
        code: 'sortAsc'
    },
    {
        icon: 'ui-grid-icon-sort-alt-down',
        code: 'sortDesc'
    },
    {
        icon: 'ui-grid-icon-cancel',
        code: 'hide'
    },
    {
        icon: 'ui-grid-icon-left-open',
        code: 'pinLeft'
    },
    {
        icon: 'ui-grid-icon-right-open',
        code: 'pinRight'
    },
    {
        icon: 'ui-grid-icon-cancel',
        code: 'resetPinLeft'
    },
    {
        icon: 'ui-grid-icon-cancel',
        code: 'resetPinRight'
    },
    {
        icon: 'ui-grid-icon-cancel',
        code: 'resetSort'
    }
];

export const SORT_ASC = 1;
export const SORT_DESC = -1;

@Component({
    selector: 'iad-table-header-menu',
    template: `<p-menu #menu [popup]="true" [model]="items" appendTo="body" styleClass="ui-grid-menu"></p-menu>
    <a class="ui-grid-column-menu-button" (click)="menu.toggle($event)"><i class="ui-grid-icon-angle-down"></i></a>`
})
export class TableHeaderMenuComponent implements OnInit, OnDestroy {
    items: MenuItem[];

    sorted: boolean;
    frozen: boolean;
    side: string;
    hideDisabled: boolean;

    sortSubscription: Subscription;
    columnCheckedSubscription: Subscription;

    /**
     * ключ настроек, идентификатор проекции/представления
     */
    @Input() groupSettingsKey: string;

    @Input() column: IadGridColumnInterface; // Текущая колонка
    @Input() columns: IadGridColumnInterface[]; // Все колонки
    @Input() defaultSortField = 'id'; // Поле для сортировки по умолчанию

    @Output() sort = new EventEmitter<boolean | string>();
    @Output() hidden = new EventEmitter<string>();

    /**
     * Событие, возникающее при заморозке или разморозке колонок
     */
    @Output() freeze = new EventEmitter<IadGridFrozenEvent>();

    constructor(
        private iadTableComponent: IadTableComponent,
        private el: ElementRef,
        private eventManager: IadEventManager,
        private translateService: TranslateService
    ) {
        this.hideDisabled = false;
    }

    ngOnInit() {
        this.frozen = this.column.frozen;
        this.sortSubscription = this.iadTableComponent.tableService.sortSource$.subscribe((sortMeta: any) => {
            if (sortMeta && sortMeta.field === this.column.field) {
                this.updateSortState();
                this.initMenuItems();
            }
        });
        this.columnCheckedSubscription = this.eventManager.subscribe(onLastColumnChecked, (event: LastColumnChecked) => {
            if ((event.content.disabled && event.content.columnName === this.column.field) || !event.content.disabled) {
                this.hideDisabled = event.content.disabled;
                this.initMenuItems();
            }
        });
        this.updateSortState();
        this.updateFrozenState();
        this.initMenuItems();
    }

    ngOnDestroy(): void {
        if (this.sortSubscription) {
            this.sortSubscription.unsubscribe();
        }
        if (this.columnCheckedSubscription) {
            this.columnCheckedSubscription.unsubscribe();
        }
    }

    /**
     * Сборка меню
     */
    initMenuItems() {
        const labels = items.map(item => 'partnerTable.menu.' + item.code);
        this.translateService.get(labels).subscribe((translatedLabels: any) => {
            this.items = [];
            items.forEach((item: TableMenuItem) => {
                this.items.push(<MenuItem>{
                    label: translatedLabels['partnerTable.menu.' + item.code],
                    command: event => {
                        // event.originalEvent: Browser event
                        // event.item: menuitem metadata
                        this[item.code](event);
                        IadDomHandler.clearSelection();
                    },
                    icon: item.icon,
                    visible: this.isVisible(item.code)
                });
            });
        });
    }

    /**
     * Обновляеттекущее состояние сортировки
     */
    updateSortState() {
        this.sorted = this.iadTableComponent.isSorted(this.column.field);
    }

    /**
     * Обновляет состояние текущей колонки
     */
    updateFrozenState() {
        if (
            this.iadTableComponent.frozenColumns &&
            this.iadTableComponent.frozenColumns.findIndex((column: IadGridColumnInterface) => column.field === this.column.field) !== -1
        ) {
            this.frozen = true;
            this.side = IAD_FROZEN_POSITION.LEFT;
        } else if (
            this.iadTableComponent.frozenRightColumns &&
            this.iadTableComponent.frozenRightColumns.findIndex((column: IadGridColumnInterface) => column.field === this.column.field) !== -1
        ) {
            this.frozen = true;
            this.side = IAD_FROZEN_POSITION.RIGHT;
        } else {
            this.frozen = false;
            this.side = undefined;
        }
    }

    /**
     * event.originalEvent: Browser event
     * event.item: menuitem metadata
     * @param event
     */
    sortAsc(event) {
        this.iadTableComponent._sortOrder = SORT_ASC;
        this.iadTableComponent._sortField = this.column.field;
        this.iadTableComponent.sortSingle();
    }

    /**
     * event.originalEvent: Browser event
     * event.item: menuitem metadata
     * @param event
     */
    sortDesc(event) {
        this.iadTableComponent._sortOrder = SORT_DESC;
        this.iadTableComponent._sortField = this.column.field;
        this.iadTableComponent.sortSingle();
    }

    /**
     * Меню сбросить сортировку
     * event.originalEvent: Browser event
     * event.item: menuitem metadata
     * @param event
     */
    resetSort(event) {
        this.iadTableComponent._sortOrder = SORT_ASC;
        this.iadTableComponent._sortField = this.defaultSortField;
        this.iadTableComponent.sortSingle();
    }

    /**
     * Меню скрыть столбец
     * event.originalEvent: Browser event
     * event.item: menuitem metadata
     * @param event
     */
    hide(event) {
        if (this.columns.filter(x => x.visible).length !== 1) {
            this.column.visible = false;
        }
        this.eventManager.broadcast({
            name: onColumnHide + this.groupSettingsKey,
            content: this.column
        });
    }

    /**
     * Меню закрепить слева
     * event.originalEvent: Browser event
     * event.item: menuitem metadata
     * @param event
     */
    pinLeft(event) {
        this.setFrozen(true, IAD_FROZEN_POSITION.LEFT);
        this.freeze.emit(<IadGridFrozenEvent>{
            field: this.column.field,
            column: this.el.nativeElement.parentNode,
            position: IAD_FROZEN_POSITION.LEFT,
            action: IAD_FROZEN_ACTION.FREEZE
        });
    }

    /**
     * Меню закрепить справа
     * event.originalEvent: Browser event
     * event.item: menuitem metadata
     * @param event
     */
    pinRight(event) {
        this.setFrozen(true, IAD_FROZEN_POSITION.RIGHT);
        this.freeze.emit(<IadGridFrozenEvent>{
            field: this.column.field,
            column: this.el.nativeElement.parentNode,
            position: IAD_FROZEN_POSITION.RIGHT,
            action: IAD_FROZEN_ACTION.FREEZE
        });
    }

    /**
     * event.originalEvent: Browser event
     * event.item: menuitem metadata
     * @param event
     */
    resetPinLeft(event) {
        this.setFrozen(false, null);
        this.freeze.emit(<IadGridFrozenEvent>{
            field: this.column.field,
            column: this.el.nativeElement.parentNode,
            position: IAD_FROZEN_POSITION.LEFT,
            action: IAD_FROZEN_ACTION.UNFREEZE
        });
    }

    /**
     * event.originalEvent: Browser event
     * event.item: menuitem metadata
     * @param event
     */
    resetPinRight(event) {
        this.setFrozen(false, null);
        this.freeze.emit(<IadGridFrozenEvent>{
            field: this.column.field,
            column: this.el.nativeElement.parentNode,
            position: IAD_FROZEN_POSITION.RIGHT,
            action: IAD_FROZEN_ACTION.UNFREEZE
        });
    }

    /**
     * Условие отображения пункта меню "Сбросить сортировку"
     * @returns {boolean}
     */
    resetSortCondition(): boolean {
        return this.sorted;
    }

    /**
     * Условие отображения пункта меню "Закрепить справа"
     * @returns {boolean}
     */
    pinRightCondition(): boolean {
        return !this.frozen;
    }

    /**
     * Условие отображения пункта меню "Закрепить слева"
     * @returns {boolean}
     */
    pinLeftCondition(): boolean {
        return !this.frozen;
    }

    /**
     * Условие отображения пункта меню "Сбросить сортировку"
     * @returns {boolean}
     */
    resetPinLeftCondition(): boolean {
        return this.frozen && this.side === IAD_FROZEN_POSITION.LEFT;
    }

    /**
     * Условие отображения пункта меню "Закрепить справа"
     * @returns {boolean}
     */
    resetPinRightCondition() {
        return this.frozen && this.side === IAD_FROZEN_POSITION.RIGHT;
    }

    /**
     * Условие отображения пункта меню "Скрыть колонку"
     * @returns {boolean}
     */
    hideCondition() {
        return !this.hideDisabled;
    }

    /**
     * Возвращает, видимый ли текущий айцтем меню или нет
     * @param code
     */
    private isVisible(code: string): boolean {
        const conditionMethodName = code + 'Condition';
        return this[conditionMethodName] === undefined || this[conditionMethodName]() === true;
    }

    /**
     * Устанавливает заморозку колонки
     * @param frozen
     * @param side
     */
    private setFrozen(frozen: boolean, side: IAD_FROZEN_POSITION | null) {
        this.frozen = frozen;
        this.side = side;
        this.initMenuItems();
    }
}
