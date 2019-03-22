export const onFrozenColumnsChange = 'onFrozenColumnsChange';

export interface FrozenChangeEvent {
    name: string;
    content: {
        columnName: string;
        side: string;
        frozen: boolean;
        tableFrozenWidth: string;
        tableFrozenCols: any[];
        tableFrozenRightWidth: string;
        tableFrozenRightCols: any[];
    };
}
