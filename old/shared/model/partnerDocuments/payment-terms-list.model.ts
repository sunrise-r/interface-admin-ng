export interface IPaymentTermsList {
    id?: number;
    code?: string;
    label?: string;
}

export class PaymentTermsList implements IPaymentTermsList {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
