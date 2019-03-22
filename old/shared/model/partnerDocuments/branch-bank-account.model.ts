import { Moment } from 'moment';

export interface IBranchBankAccount {
    id?: number;
    creationDate?: Moment;
    settlementAccount?: string;
    correspondentAccount?: string;
    bankIdentificationAccount?: string;
    bankName?: string;
    branchId?: number;
}

export class BranchBankAccount implements IBranchBankAccount {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public settlementAccount?: string,
        public correspondentAccount?: string,
        public bankIdentificationAccount?: string,
        public bankName?: string,
        public branchId?: number
    ) {}
}
