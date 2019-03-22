export interface ICodeOKP {
    id?: number;
    code?: string;
    label?: string;
}

export class CodeOKP implements ICodeOKP {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
