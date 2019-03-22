import { Moment } from 'moment';

export interface IPaymentTerms {
    id?: number;
    quantity?: string;
    from?: Moment;
    before?: Moment;
    paymentTermsListId?: number;
    dayTypeId?: number;
}

export class PaymentTerms implements IPaymentTerms {
    constructor(
        public id?: number,
        public quantity?: string,
        public from?: Moment,
        public before?: Moment,
        public paymentTermsListId?: number,
        public dayTypeId?: number
    ) {}
}
