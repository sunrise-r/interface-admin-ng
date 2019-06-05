import { Injectable } from '@angular/core';
import { IadDomHandler } from 'iad-interface-admin/core';
import { IadGridColumn } from '../model/iad-grid-column.model';
import {
    IAD_FROZEN_POSITION,
    IadGridColumnFrozen,
    IadGridColumnFrozenField, IadGridColumnOrder, IadGridCurrentColumnInfo,
    IadGridFrozenEvent,
    IadGridFrozenStructure
} from './base-grid-freeze-column.model';

const SCROLLABLE_WRAPPER_CLASS = 'ui-table-scrollable-wrapper';
const FROZEN_STATIC_CONTAINER_CLASS = 'frozen-static';
const FROZEN_LEFT_CONTAINER_CLASS = 'frozen-left';
const FROZEN_RIGHT_CONTAINER_CLASS = 'frozen-right';
const TABLE_HEADER_COLUMN_SELECTOR = '.ui-table-scrollable-header thead > tr:first-child > th';
const TABLE_RESIZABLE_COLUMN_CLASS = 'ui-resizable-column';

interface ResizeEvent {
    element: HTMLElement;
    delta: number;
}

type MergeColumnCallback = (column: IadGridColumn, frozen: boolean, key: string, areaIndex?: number) => any | void;

@Injectable()
export class BaseGridColumnsService {
    /**
     * Размеры колонок текущей таблицы
     */
    columnSizes = {};

    /**
     * Структура замороженных колонок
     */
    frozenStructure: IadGridFrozenStructure;

    /**
     * Размеры контейнеров таблицы
     */
    private containerSizes;

    /**
     * Считает размер переданной в качестве параметра HTML колонки таблицы
     * и размеры всех сосделних колонок
     * @param event ResizeEvent
     * @param frozenStructure
     */
    resize(event: ResizeEvent, frozenStructure: IadGridFrozenStructure): { [param: string]: string | number } {
        const width: { [param: string]: string | number } = {};
        this.calculateColumnsSizes(event.element, frozenStructure);
        this.eachColumnArrays((column: IadGridColumn, frozen: boolean, key: string) => {
            if (this.columnSizes[column.field]) {
                column.width = this.columnSizes[column.field];
            }
            width[column.field] = column.width;
        });
        return width;
    }

    /**
     * Инициализация сервиса
     * @param event FrozenEvent
     * @param frozenStructure
     */
    freeze(event: IadGridFrozenEvent, frozenStructure: IadGridFrozenStructure): IadGridFrozenStructure {
        const methodName = event.action + 'Column';
        if (!this[methodName]) {
            throw Error('Unknown method name DataTableColumnsService.' + methodName);
        }

        this.calculateColumnsSizes(event.column, frozenStructure);

        this.frozenStructure = frozenStructure;

        const elementWidth = parseInt(IadDomHandler.getOuterWidth(event.column), 10);

        return this[methodName](event.field, elementWidth, event.position);
    }

    /**
     * Прикрепляет колонку к указанной стороне
     * @param fieldName
     * @param elementWidth
     * @param position
     */
    freezeColumn(fieldName: string, elementWidth: number, position: IAD_FROZEN_POSITION): IadGridFrozenStructure {
        if (this.frozenStructure[position] === undefined) {
            this.frozenStructure[position] = [];
        }
        const columnModel = this.popDataTableColumn(fieldName, 'center');
        const index = this.frozenStructure[position].length;
        columnModel.frozen = true;
        columnModel.position = position;
        columnModel.frozenOrder = index;

        this.frozenStructure[position].splice(index, 0, columnModel);
        this.updateFrozenAreaWidth(elementWidth, position, true);
        return this.frozenStructure;
    }

    /**
     * Открепляет колонку от указанной стороны
     * @param fieldName
     * @param elementWidth
     * @param position
     */
    unFreezeColumn(fieldName: string, elementWidth: number, position: IAD_FROZEN_POSITION): IadGridFrozenStructure {
        const columnModel = this.popDataTableColumn(fieldName, position);
        const index = columnModel.order;
        columnModel.frozen = false;
        columnModel.position = 'center';
        columnModel.frozenOrder = 0;

        this.frozenStructure.center.splice(index, 0, columnModel);
        this.updateFrozenAreaWidth(elementWidth, position, false);
        return this.frozenStructure;
    }

    /**
     * Возвращает информацию о текущей заморозке колонок
     */
    getFrozenColumns(): IadGridColumnFrozenField[] {
        return this.mapColumnArrays(
            (column: IadGridColumn, frozen: boolean, position: string) => new IadGridColumnFrozenField(column.field, frozen, position)
        );
    }

    /**
     * Returns information about dynamic frozen areas/sides/containers
     */
    getGridSidesInformation(): IadGridColumnFrozen {
        const frozenStructure = this.frozenStructure;
        return new IadGridColumnFrozen(frozenStructure.rightWidth, frozenStructure.leftWidth);
    }

    /**
     * Возвращает информацию о текущей заморозке колонок
     */
    getOrderInformation(frozenStructure: IadGridFrozenStructure) {
        this.frozenStructure = frozenStructure;
        return this.mapColumnArrays(
            (column, frozen, position, areaIndex) =>
                new IadGridColumnOrder(column.field, frozen ? areaIndex : column.frozenOrder, frozen ? column.order : areaIndex)
        );
    }

    /**
     * Updates container sizes using known DataTableColumn and current DataTableComponent element;
     * This method is called on column visibility change event and is necessary to
     * correctly change the frozen area size
     * @param column
     * @param frozenStructure
     * @param dataTableElement
     */
    updateContainerSizes(column: IadGridColumn, frozenStructure: IadGridFrozenStructure, dataTableElement: HTMLElement): IadGridFrozenStructure {
        this.containerSizes = {};
        this.frozenStructure = frozenStructure;
        if (!column.frozen) {
            return this.frozenStructure;
        }
        const selector = '.' + SCROLLABLE_WRAPPER_CLASS + ' > :not(.' + FROZEN_STATIC_CONTAINER_CLASS + ')';
        const containers = Array.from(dataTableElement.querySelectorAll(selector));
        containers.forEach((container: HTMLElement) => {
            const area = this.determineFrozenArea(container);
            this.frozenStructure[area].forEach((_column: IadGridColumn) => {
                const width = _column.visible ? _column.width : 0;
                this.updateContainerSize(<HTMLElement>container, width, _column.position);
            });
        });
        return this.frozenStructure;
    }

    /**
     * Слияние всех видов колонок
     */
    private mapColumnArrays(callback: MergeColumnCallback) {
        const frozenStructure = this.frozenStructure;
        let columns: any[] = [];
        Object.keys(frozenStructure).forEach(key => {
            const frozen = key === 'left' || key === 'right';
            if (['left', 'right', 'center'].includes(key)) {
                columns = columns.concat(
                    frozenStructure[key].map((column: IadGridColumn, areaIndex) => callback(column, frozen, key, areaIndex))
                );
            }
        });
        return columns;
    }

    /**
     * Слияние всех видов колонок
     */
    private eachColumnArrays(callback: MergeColumnCallback) {
        const frozenStructure = this.frozenStructure;
        Object.keys(frozenStructure).forEach(key => {
            const frozen = key === 'left' || key === 'right';
            if (['left', 'right', 'center'].includes(key)) {
                frozenStructure[key].map((column: IadGridColumn, areaIndex) => callback(column, frozen, key, areaIndex));
            }
        });
    }

    /**
     *
     * @param element
     * @param frozenStructure
     */
    private calculateColumnsSizes(element: HTMLElement, frozenStructure: IadGridFrozenStructure) {
        this.containerSizes = {};
        this.frozenStructure = frozenStructure;
        const containers = this.findContainers(element);
        containers.forEach((container: HTMLElement) => {
            const thNodes = container.querySelectorAll(TABLE_HEADER_COLUMN_SELECTOR);
            if (thNodes === undefined && thNodes.length === 0) {
                return;
            }
            Array.from(thNodes).forEach((thNode: HTMLElement, index: number) => {
                const columnsWidth = this.getHTMLNodeWidth(thNode);
                const column = this.detectColumnNode(index, container, columnsWidth);
                // Обновляет ширину контейнера
                this.updateContainerSize(container, column.width, column.frozenArea);
                // Добавляет инфо о ширине колонки в список только если у колонки есть класс resizable
                if (thNode.classList.contains(TABLE_RESIZABLE_COLUMN_CLASS)) {
                    this.columnSizes[column.field] = column.width;
                }
            });
        });
    }

    /**
     * Returns list of those HTML areas/containers in which columns may be
     * Note, we don`t need to collect any of frozen-static areas/containers
     * @param element
     */
    private findContainers(element: HTMLElement): HTMLElement[] {
        const wrapper = IadDomHandler.findParentByClassName(element, SCROLLABLE_WRAPPER_CLASS);
        let containers: HTMLElement[] = [];
        if (wrapper !== undefined) {
            containers = <HTMLElement[]>Array.from(wrapper.querySelectorAll(':scope > :not(.' + FROZEN_STATIC_CONTAINER_CLASS + ')'));
        }
        return containers;
    }

    /**
     * Обновляет информацию о размере контейнера
     * @param container
     * @param columnWidth
     * @param side
     */
    private updateContainerSize(container: HTMLElement, columnWidth: number, side?: string): void {
        if (!side) {
            side = 'center';
        }
        let size = this.containerSizes[side];
        if (size === undefined) {
            size = 1; // to prevent removing 1px border... Not working....
        }
        this.containerSizes[side] = size + columnWidth;
        if (side === IAD_FROZEN_POSITION.RIGHT || side === IAD_FROZEN_POSITION.LEFT) {
            this.frozenStructure[side + 'Width'] = container.style.width = this.containerSizes[side] + 'px';
        }
    }

    /**
     * Не позволяет задать ширину колонки меньше 10 px;
     * @param thNode
     * @param minWidth
     */
    private getHTMLNodeWidth(thNode: HTMLElement, minWidth = 10): number {
        return thNode.offsetWidth < minWidth ? minWidth : thNode.offsetWidth;
    }

    /**
     * Получает объект из названия и ширины колонки
     * @param index
     * @param container
     * @param columnWidth
     */
    private detectColumnNode(index: number, container: HTMLElement, columnWidth: number): IadGridCurrentColumnInfo {
        const area = this.determineFrozenArea(container);
        const column = this.frozenStructure[area].filter(_column => _column.visible === true)[index];
        const frozenArea = area !== 'center' ? area : undefined;
        return new IadGridCurrentColumnInfo(column.field, frozenArea, columnWidth);
    }

    /**
     * Определяет, с какой стороны текущий контейнер заморожен
     * @param container
     */
    private determineFrozenArea(container: HTMLElement): string {
        if (container.classList.contains(FROZEN_LEFT_CONTAINER_CLASS)) {
            return `${IAD_FROZEN_POSITION.LEFT}`;
        }
        if (container.classList.contains(FROZEN_RIGHT_CONTAINER_CLASS)) {
            return `${IAD_FROZEN_POSITION.RIGHT}`;
        }
        return 'center';
    }

    /**
     * Достаёт ширину замороженного контейнера
     * @param elementWidth
     * @param position
     * @param inc
     */
    private updateFrozenAreaWidth(elementWidth: number, position: IAD_FROZEN_POSITION, inc: boolean): string {
        const prop = position + 'Width';
        const frozenWidth =
            this.frozenStructure[prop] && this.frozenStructure[prop].length > 0 ? parseInt(this.frozenStructure[prop], 10) : 0;
        this.frozenStructure[prop] = (inc ? frozenWidth + elementWidth : frozenWidth - elementWidth) + 'px';
        return this.frozenStructure[prop];
    }

    /**
     * Возвращает замороженную колонку по индексу
     * @param columnName
     * @param area
     */
    private popDataTableColumn(columnName: string, area: string): IadGridColumn {
        const index = this.frozenStructure[area].findIndex((column: IadGridColumn) => column.field === columnName);
        return this.frozenStructure[area].splice(index, 1).pop();
    }
}
