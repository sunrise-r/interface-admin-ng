export interface ICodeETSNG {
    id?: number;
    code?: string;
    label?: string;
}

export class CodeETSNG implements ICodeETSNG {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
