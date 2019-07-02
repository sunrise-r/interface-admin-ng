export enum IAD_FROZEN_POSITION {
    LEFT = 'left',
    RIGHT = 'right'
}

export enum IAD_FROZEN_ACTION {
    FREEZE = 'freeze',
    UNFREEZE = 'unFreeze'
}

/**
 * Событие "В меню колонки выбрана заморозка/разморозка"
 */
export interface IadGridFrozenEvent {
    field: string;
    column: HTMLElement;
    position: IAD_FROZEN_POSITION;
    action: IAD_FROZEN_ACTION;
}

/**
 * Model to store widths of frozen areas in userSettings
 */
export interface IadGridColumnFrozen {
    rightWidth: string;
    leftWidth: string;
}
export class IadGridColumnFrozen implements IadGridColumnFrozen {
    constructor(public rightWidth: string, public leftWidth: string) {}
}

/**
 * Object associating column field name, its width and area in which column is frozen, if it is.
 */
export class IadGridCurrentColumnInfo {
    constructor(public field: string, public frozenArea: string, public width: number) {}
}

/**
 * Model to store Column Frozen State and area in which column is frozen, if it is in userSettings.
 */
export class IadGridColumnFrozenField {
    constructor(public field: string, public frozen: boolean, public frozenArea: string) {}
}

/**
 * Model to store Column Order in userSettings
 */
export class IadGridColumnOrder {
    constructor(public field: string, public frozenOrder: number, public order: number) {}
}

/**
 * Model to keep structure of the table;
 * left: IDataTableColumn[] in left frozen area
 * right: IDataTableColumn[] in right frozen area
 * center: IDataTableColumn[] in center area (dynamic/scrollable)
 * leftWidth: width of left frozen area
 * rightWidth: width of right frozen area
 */
export class IadGridFrozenStructure {
    left: any[];
    right: any[];
    center: any[];
    leftWidth: string;
    rightWidth: string;
}
