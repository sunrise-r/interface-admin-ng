export interface IGostType {
    id?: number;
    code?: string;
    label?: string;
}

export class GostType implements IGostType {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
