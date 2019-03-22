import { Moment } from 'moment';

export interface IBankAccount {
    id?: number;
    creationDate?: Moment;
    settlementAccount?: string;
    correspondentAccount?: string;
    bankIdentificationAccount?: string;
    bankName?: string;
}

export class BankAccount implements IBankAccount {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public settlementAccount?: string,
        public correspondentAccount?: string,
        public bankIdentificationAccount?: string,
        public bankName?: string
    ) {}
}
