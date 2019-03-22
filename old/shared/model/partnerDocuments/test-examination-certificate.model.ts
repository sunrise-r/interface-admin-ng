import { Moment } from 'moment';

export interface ITestExaminationCertificate {
    id?: number;
    creationDate?: Moment;
    series?: string;
    number?: string;
    issuedBy?: string;
    dateOfIssue?: Moment;
    faculty?: string;
    specialization?: string;
    employesId?: number;
}

export class TestExaminationCertificate implements ITestExaminationCertificate {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public series?: string,
        public number?: string,
        public issuedBy?: string,
        public dateOfIssue?: Moment,
        public faculty?: string,
        public specialization?: string,
        public employesId?: number
    ) {}
}
