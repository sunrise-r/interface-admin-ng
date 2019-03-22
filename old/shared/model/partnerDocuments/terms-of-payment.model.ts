export interface ITermsOfPayment {
    id?: number;
    formOfPaymentId?: number;
    paymentPeriodId?: number;
}

export class TermsOfPayment implements ITermsOfPayment {
    constructor(public id?: number, public formOfPaymentId?: number, public paymentPeriodId?: number) {}
}
