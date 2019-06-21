import { Subject } from 'rxjs';
import { CustomizeQuery } from 'iad-interface-admin/filter';

import { IadGridColumn } from './iad-grid-column.model';

export enum FILTER_TYPE {
    PARTICULAR = 0,
    GLOBAL = 1,
    BOTH = 2
}

export interface IadGridConfigProvider {
    /**
     * Данные таблицы были изменены
     * Передаёт в data-table.component информацию обо всех текущих настройках в виде единого DatatableConfigModel файла
     * Это позволяет исключить установку сортировки до обработки запроса на обновление данных без
     * необходимости устанавливать таймауты
     */
    refreshGridConfig: Subject<IadGridConfigModel>;
}

export class IadGridConfigModel {
    columns: IadGridColumn[];
    rightColumns: IadGridColumn[];
    leftColumns: IadGridColumn[];
    searchUrl: string;
    sortField: string;
    sortOrder: number;
    defaultSortField: string;
    leftWidth: string;
    rightWidth: string;
    filter: CustomizeQuery;
    reset: boolean;
    constructor() {
        this.columns = [];
        this.sortField = null;
        this.sortOrder = 1;
        this.defaultSortField = 'creationDate';
        this.leftWidth = '0';
        this.rightWidth = '0';
    }
}
