import { Moment } from 'moment';

export interface IPasportRF {
    id?: number;
    creationDate?: Moment;
    series?: string;
    number?: string;
    issuedBy?: string;
    dateOfIssue?: Moment;
    employesId?: number;
}

export class PasportRF implements IPasportRF {
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
