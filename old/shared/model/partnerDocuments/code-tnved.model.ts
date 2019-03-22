export interface ICodeTNVED {
    id?: number;
    code?: string;
    label?: string;
}

export class CodeTNVED implements ICodeTNVED {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
