export interface IConsignor {
    id?: number;
    code?: string;
    label?: string;
}

export class Consignor implements IConsignor {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
