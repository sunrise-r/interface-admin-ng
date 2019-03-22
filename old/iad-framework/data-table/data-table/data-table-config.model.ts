import { IDataTableColumn } from './data-table.model';
import { Subject } from 'rxjs';

export interface DataTableConfigProvider {
    /**
     * Данные таблицы были изменены
     * Передаёт в data-table.component информацию обо всех текущих настройках в виде единого DatatableConfigModel файла
     * Это позволяет исключить установку сортировки до обработки запроса на обновление данных без
     * необходимости устанавливать таймауты
     */
    refreshConfig: Subject<DataTableConfigModel>;
}

export class DataTableConfigModel {
    constructor(
        public columns: IDataTableColumn[] = [],
        public rightColumns: IDataTableColumn[] = [],
        public leftColumns: IDataTableColumn[] = [],
        public sortField: string = null,
        public sortOrder = 1,
        public defaultSortField = 'creationDate',
        public leftWidth = '0',
        public rightWidth = '0'
    ) {}
}
