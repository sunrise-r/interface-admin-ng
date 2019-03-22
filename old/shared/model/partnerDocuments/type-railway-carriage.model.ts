export interface ITypeRailwayCarriage {
    id?: number;
    code?: string;
    label?: string;
}

export class TypeRailwayCarriage implements ITypeRailwayCarriage {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
