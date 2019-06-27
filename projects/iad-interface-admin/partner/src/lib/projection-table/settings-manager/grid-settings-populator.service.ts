import { Injectable } from '@angular/core';

import {
    IadGridConfigModel,
    IadGridColumn,
    IAD_FROZEN_POSITION,
    IadGridColumnFrozen,
    IadGridColumnFrozenField,
    IadGridColumnOrder
} from 'iad-interface-admin';
import { IadHelper } from 'iad-interface-admin/core';

@Injectable({
    providedIn: 'root'
})
export class GridSettingsPopulatorService {
    /**
     * Разрешает настройки DataTableColumns
     * @param columns
     * @param prefs
     */
    populate(columns: IadGridColumn[], prefs: Map<string, string>): IadGridConfigModel {
        const model = new IadGridConfigModel();
        let sortField: string,
            sortOrder: string,
            dgColumnWidth: { [param: string]: string },
            dgFrozenInfo: IadGridColumnFrozenField[],
            dgSidesInfo: IadGridColumnFrozen,
            dgOrderInfo: IadGridColumnOrder[],
            dgColumnVisibility: { [param: string]: boolean };
        if (prefs.has('sort')) {
            [sortField, sortOrder] = prefs.get('sort').split(',');
            const convertSorting = (sort: string) => (sort === 'asc' ? 1 : sort === 'desc' ? -1 : 0);

            model.set('sortField', sortField);
            model.set('sortOrder', convertSorting(sortOrder) || parseInt(sortOrder, 10));
            if (Number.isNaN(model.sortOrder)) {
                model.set('sortOrder', 1);
            }
        }
        if (prefs.has('dgSidesInfo')) {
            dgSidesInfo = JSON.parse(prefs.get('dgSidesInfo'));
            model.set('rightWidth', dgSidesInfo.rightWidth);
            model.set('leftWidth', dgSidesInfo.leftWidth);
        }
        if (prefs.has('dgColumnWidth')) {
            dgColumnWidth = JSON.parse(prefs.get('dgColumnWidth'));
            columns.forEach(column => {
                if (dgColumnWidth[column.field]) {
                    column.width = IadHelper.toInt(dgColumnWidth[column.field]);
                }
            });
        }
        if (prefs.has('dgColumnVisibility')) {
            dgColumnVisibility = JSON.parse(prefs.get('dgColumnVisibility'));
            columns.forEach(column => {
                column.visible = dgColumnVisibility[column.field];
            });
        }
        if (prefs.has('dgFrozenInfo')) {
            dgFrozenInfo = JSON.parse(prefs.get('dgFrozenInfo'));
            columns.forEach(column => {
                const info = dgFrozenInfo.find(_column => _column.field === column.field);
                column.position = info.frozenArea;
                column.frozen = info.frozen;
            });
        }
        if (prefs.has('dgOrderInfo')) {
            dgOrderInfo = JSON.parse(prefs.get('dgOrderInfo'));
        }
        model.set('columns', this.reorderColumns(columns.filter(_column => !_column.frozen), dgOrderInfo));
        model.set('rightColumns', this.reorderColumns(
            columns.filter(_column => _column.position === IAD_FROZEN_POSITION.RIGHT),
            dgOrderInfo,
            IAD_FROZEN_POSITION.RIGHT
        ));
        model.set('leftColumns', this.reorderColumns(
            columns.filter(_column => _column.position === IAD_FROZEN_POSITION.LEFT),
            dgOrderInfo,
            IAD_FROZEN_POSITION.LEFT
        ));
        return model;
    }

    /**
     * Упорядочивает колонки в соответствии с порядком из входящего массива
     * @param columns
     * @param columnsOrder
     * @param frozenArea
     */
    private reorderColumns(columns: IadGridColumn[], columnsOrder: IadGridColumnOrder[], frozenArea?: IAD_FROZEN_POSITION): IadGridColumn[] {
        const sortProperty = frozenArea ? 'frozenOrder' : 'order';
        return columns
            .map((column, index) => {
                const columnOrder = columnsOrder ? columnsOrder.find(_columnOrder => _columnOrder.field === column.field) : <IadGridColumnOrder>{};
                column.frozenOrder = columnOrder && !isNaN(columnOrder.frozenOrder) ? columnOrder.frozenOrder : 0;
                column.order = columnOrder && !isNaN(columnOrder.order) ? columnOrder.order : index;
                return column;
            })
            .sort((a: IadGridColumn, b: IadGridColumn) => {
                return a[sortProperty] > b[sortProperty] ? 1 : a[sortProperty] < b[sortProperty] ? -1 : 0;
            });
    }
}
