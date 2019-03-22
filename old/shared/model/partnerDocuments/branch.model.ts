import { Moment } from 'moment';
import { IBranchBankAccount } from 'app/shared/model/partnerDocuments/branch-bank-account.model';
import { IEmployee } from 'app/shared/model/partnerDocuments/employee.model';

export interface IBranch {
    id?: number;
    creationDate?: Moment;
    name?: string;
    registerDate?: Moment;
    inn?: string;
    ogrn?: string;
    kpp?: string;
    description?: string;
    branchBankAccounts?: IBranchBankAccount[];
    employees?: IEmployee[];
}

export class Branch implements IBranch {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public registerDate?: Moment,
        public inn?: string,
        public ogrn?: string,
        public kpp?: string,
        public description?: string,
        public branchBankAccounts?: IBranchBankAccount[],
        public employees?: IEmployee[]
    ) {}
}
