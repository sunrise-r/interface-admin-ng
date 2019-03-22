import { Moment } from 'moment';

export interface IDriverLicense {
    id?: number;
    creationDate?: Moment;
    series?: string;
    number?: string;
    issuedBy?: string;
    categories?: string;
    dateOfIssue?: Moment;
    validDate?: Moment;
    specialNotes?: string;
    employeeId?: number;
}

export class DriverLicense implements IDriverLicense {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public series?: string,
        public number?: string,
        public issuedBy?: string,
        public categories?: string,
        public dateOfIssue?: Moment,
        public validDate?: Moment,
        public specialNotes?: string,
        public employeeId?: number
    ) {}
}
