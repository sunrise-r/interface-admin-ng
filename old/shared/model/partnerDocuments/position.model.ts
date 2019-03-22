export interface IPosition {
    id?: number;
    code?: string;
    label?: string;
}

export class Position implements IPosition {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
