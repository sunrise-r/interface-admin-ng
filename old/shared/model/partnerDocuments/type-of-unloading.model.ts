export interface ITypeOfUnloading {
    id?: number;
    code?: string;
    label?: string;
}

export class TypeOfUnloading implements ITypeOfUnloading {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
