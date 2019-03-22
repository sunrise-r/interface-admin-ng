import { Moment } from 'moment';

export interface IDiploma {
    id?: number;
    creationDate?: Moment;
    series?: string;
    number?: string;
    issuedBy?: string;
    dateOfIssue?: Moment;
    department?: string;
    specialization?: string;
    employeeId?: number;
}

export class Diploma implements IDiploma {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public series?: string,
        public number?: string,
        public issuedBy?: string,
        public dateOfIssue?: Moment,
        public department?: string,
        public specialization?: string,
        public employeeId?: number
    ) {}
}
