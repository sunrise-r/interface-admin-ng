export const onColumnHide = 'onColumnHide';
export const onLastColumnChecked = 'onLastColumnChecked';

export interface LastColumnChecked {
    name: string;
    content: {
        columnName: string;
        disabled: boolean;
    };
}
