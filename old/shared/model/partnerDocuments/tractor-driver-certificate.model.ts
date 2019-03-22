import { Moment } from 'moment';

export interface ITractorDriverCertificate {
    id?: number;
    creationDate?: Moment;
    series?: string;
    number?: string;
    code?: string;
    categories?: string;
    issuedBy?: string;
    dateOfIssue?: Moment;
    finishingDate?: Moment;
    employesId?: number;
}

export class TractorDriverCertificate implements ITractorDriverCertificate {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public series?: string,
        public number?: string,
        public code?: string,
        public categories?: string,
        public issuedBy?: string,
        public dateOfIssue?: Moment,
        public finishingDate?: Moment,
        public employesId?: number
    ) {}
}
