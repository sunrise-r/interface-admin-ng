import { Moment } from 'moment';

export interface ITaxpayerIdentificationNumber {
    id?: number;
    creationDate?: Moment;
    inn?: string;
    issuedBy?: string;
    stagingDate?: Moment;
    employesId?: number;
}

export class TaxpayerIdentificationNumber implements ITaxpayerIdentificationNumber {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public inn?: string,
        public issuedBy?: string,
        public stagingDate?: Moment,
        public employesId?: number
    ) {}
}
