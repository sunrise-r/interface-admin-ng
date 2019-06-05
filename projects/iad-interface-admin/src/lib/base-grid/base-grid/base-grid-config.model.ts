import { Subject } from 'rxjs';
import { CustomizeQuery } from 'iad-interface-admin/filter';
import { IadGridColumn } from '../model/iad-grid-column.model';

export interface DataTableConfigProvider {
    /**
     * Данные таблицы были изменены
     * Передаёт в data-table.component информацию обо всех текущих настройках в виде единого DatatableConfigModel файла
     * Это позволяет исключить установку сортировки до обработки запроса на обновление данных без
     * необходимости устанавливать таймауты
     */
    refreshConfig: Subject<BaseGridConfigModel>;
}

export class BaseGridConfigModel {
    filter: CustomizeQuery;
    constructor(
        public columns: IadGridColumn[] = [],
        public rightColumns: IadGridColumn[] = [],
        public leftColumns: IadGridColumn[] = [],
        public sortField: string = null,
        public sortOrder = 1,
        public defaultSortField = 'creationDate',
        public leftWidth = '0',
        public rightWidth = '0'
    ) {}
}
