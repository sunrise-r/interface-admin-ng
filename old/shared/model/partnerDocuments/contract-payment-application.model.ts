import { Moment } from 'moment';

export interface IContractPaymentApplication {
    id?: number;
    creationDate?: Moment;
    startDate?: Moment;
    endDate?: Moment;
    number?: string;
    contractId?: number;
    templateId?: number;
    paymentTermsId?: number;
}

export class ContractPaymentApplication implements IContractPaymentApplication {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public startDate?: Moment,
        public endDate?: Moment,
        public number?: string,
        public contractId?: number,
        public templateId?: number,
        public paymentTermsId?: number
    ) {}
}
