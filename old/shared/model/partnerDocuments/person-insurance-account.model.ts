import { Moment } from 'moment';

export interface IPersonInsuranceAccount {
    id?: number;
    creationDate?: Moment;
    insuranceIndividualAccountNumber?: string;
    dateOfIssue?: Moment;
    employesId?: number;
}

export class PersonInsuranceAccount implements IPersonInsuranceAccount {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public insuranceIndividualAccountNumber?: string,
        public dateOfIssue?: Moment,
        public employesId?: number
    ) {}
}
