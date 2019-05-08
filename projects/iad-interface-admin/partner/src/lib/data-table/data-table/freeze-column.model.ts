export enum FROZEN_POSITION {
    LEFT = 'left',
    RIGHT = 'right'
}

export enum FROZEN_ACTION {
    FREEZE = 'freeze',
    UNFREEZE = 'unFreeze'
}

/**
 * Событие "В меню колонки выбрана заморозка/разморозка"
 */
export interface FrozenEvent {
    field: string;
    column: HTMLElement;
    position: FROZEN_POSITION;
    action: FROZEN_ACTION;
}

/**
 * Model to store widths of frozen areas in userSettings
 */
export interface IDTColumnFrozen {
    rightWidth: string;
    leftWidth: string;
}
export class DTColumnFrozen implements IDTColumnFrozen {
    constructor(public rightWidth: string, public leftWidth: string) {}
}

/**
 * Object associating column field name, its width and area in which column is frozen, if it is.
 */
export class CurrentColumnInfo {
    constructor(public field: string, public frozenArea: string, public width: number) {}
}

/**
 * Model to store Column Frozen State and area in which column is frozen, if it is in userSettings.
 */
export class DTColumnFrozenField {
    constructor(public field: string, public frozen: boolean, public frozenArea: string) {}
}

/**
 * Model to store Column Order in userSettings
 */
export class ColumnOrder {
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
export class FrozenStructure {
    left: any[];
    right: any[];
    center: any[];
    leftWidth: string;
    rightWidth: string;
}
