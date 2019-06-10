/**
 * PART OF PARTNER PROJECT. REMOVE IT FROM HERE!
 */
export enum SELECT_ACTION {
    SELECT = 'select',
    UNSELECT = 'unselect'
}

export const onGridRowSelection = 'onGridRowSelection';
export class IadGridRowSelection {
    public name: string;
    constructor(public content?: any) {
        this.name = onGridRowSelection;
    }
}
