export interface IDayType {
    id?: number;
    code?: string;
    label?: string;
}

export class DayType implements IDayType {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
