export interface IPaymentPeriod {
    id?: number;
    code?: string;
    label?: string;
}

export class PaymentPeriod implements IPaymentPeriod {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
