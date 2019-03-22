import { Injectable } from '@angular/core';
import { DataTableConfigModel } from '../data-table/data-table/data-table-config.model';
import { DataTableColumn, IDataTableColumn } from '../data-table/data-table/data-table.model';
import { ColumnOrder, DTColumnFrozenField, FROZEN_POSITION, IDTColumnFrozen } from '../data-table/data-table/freeze-column.model';

@Injectable()
export class GridConfigService {
    /**
     * Разрешает настройки DataTableColumns
     * @param columns
     * @param prefs
     */
    populate(columns: IDataTableColumn[], prefs: Map<string, string>): DataTableConfigModel {
        const model = new DataTableConfigModel();
        let sortField: string,
            sortOrder: string,
            dgColumnWidth: { [param: string]: string },
            dgFrozenInfo: DTColumnFrozenField[],
            dgSidesInfo: IDTColumnFrozen,
            dgOrderInfo: ColumnOrder[],
            dgColumnVisibility: { [param: string]: boolean };
        if (prefs.has('sort')) {
            [sortField, sortOrder] = prefs.get('sort').split(',');
            model.sortField = sortField;
            model.sortOrder = parseInt(sortOrder, 10);
        }
        if (prefs.has('dgSidesInfo')) {
            dgSidesInfo = JSON.parse(prefs.get('dgSidesInfo'));
            model.rightWidth = dgSidesInfo.rightWidth;
            model.leftWidth = dgSidesInfo.leftWidth;
        }
        if (prefs.has('dgColumnWidth')) {
            dgColumnWidth = JSON.parse(prefs.get('dgColumnWidth'));
            columns.forEach(column => {
                if (dgColumnWidth[column.field]) {
                    column.width = dgColumnWidth[column.field];
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
        model.columns = this.reorderColumns(columns.filter(_column => !_column.frozen), dgOrderInfo);
        model.rightColumns = this.reorderColumns(
            columns.filter(_column => _column.position === FROZEN_POSITION.RIGHT),
            dgOrderInfo,
            FROZEN_POSITION.RIGHT
        );
        model.leftColumns = this.reorderColumns(
            columns.filter(_column => _column.position === FROZEN_POSITION.LEFT),
            dgOrderInfo,
            FROZEN_POSITION.LEFT
        );
        return model;
    }

    /**
     * Упорядочивает колонки в соответствии с порядком из входящего массива
     * @param columns
     * @param columnsOrder
     * @param frozenArea
     */
    private reorderColumns(columns: DataTableColumn[], columnsOrder: ColumnOrder[], frozenArea?: FROZEN_POSITION): DataTableColumn[] {
        const sortProperty = frozenArea ? 'frozenOrder' : 'order';
        return columns
            .map((column, index) => {
                const columnOrder = columnsOrder ? columnsOrder.find(_columnOrder => _columnOrder.field === column.field) : <ColumnOrder>{};
                column.frozenOrder = !isNaN(columnOrder.frozenOrder) ? columnOrder.frozenOrder : 0;
                column.order = !isNaN(columnOrder.order) ? columnOrder.order : index;
                return column;
            })
            .sort((a: DataTableColumn, b: DataTableColumn) => {
                return a[sortProperty] > b[sortProperty] ? 1 : a[sortProperty] < b[sortProperty] ? -1 : 0;
            });
    }
}
