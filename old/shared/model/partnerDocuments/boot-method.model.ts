export interface IBootMethod {
    id?: number;
    code?: string;
    label?: string;
}

export class BootMethod implements IBootMethod {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
