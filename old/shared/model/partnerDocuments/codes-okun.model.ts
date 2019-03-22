export interface ICodesOKUN {
    id?: number;
    code?: string;
    label?: string;
}

export class CodesOKUN implements ICodesOKUN {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
