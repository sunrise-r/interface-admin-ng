import { Moment } from 'moment';

export interface IPassportRF {
    id?: number;
    creationDate?: Moment;
    series?: string;
    number?: string;
    issuedBy?: string;
    dateOfIssue?: Moment;
    employesId?: number;
}

export class PassportRF implements IPassportRF {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public series?: string,
        public number?: string,
        public issuedBy?: string,
        public dateOfIssue?: Moment,
        public employesId?: number
    ) {}
}
