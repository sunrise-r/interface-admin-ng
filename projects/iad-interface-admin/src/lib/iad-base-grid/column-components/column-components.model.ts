import { Subject } from 'rxjs';
import { IadGridColumn } from '../model/iad-grid-column.model';

export interface AffectTableInterface {
    /**
     * Наблюдатель управления таблицей
     */
    manageTable: Subject<{ code: string; value: any }>;
}

export interface TableTdContentInterface {
    selected: boolean;
    rowData: any;
    col: IadGridColumn;
}
