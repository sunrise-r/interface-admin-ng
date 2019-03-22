export interface IFormOfPayment {
    id?: number;
    code?: string;
    label?: string;
}

export class FormOfPayment implements IFormOfPayment {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
