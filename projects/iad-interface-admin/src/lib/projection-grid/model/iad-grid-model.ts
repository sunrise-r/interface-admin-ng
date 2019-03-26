import { Subject } from 'rxjs';
import {IadGridColumn} from './iad-grid-column.model';

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
  refreshConfig: Subject<IadGridConfigModel>;
}

export class IadGridConfigModel {
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
