import { Moment } from 'moment';

export interface IPrize {
    id?: number;
    creationDate?: Moment;
    series?: string;
    number?: string;
    issuedBy?: string;
    dateOfIssue?: Moment;
    description?: string;
    employesId?: number;
    documentGroupId?: number;
    documentId?: number;
}

export class Prize implements IPrize {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public series?: string,
        public number?: string,
        public issuedBy?: string,
        public dateOfIssue?: Moment,
        public description?: string,
        public employesId?: number,
        public documentGroupId?: number,
        public documentId?: number
    ) {}
}
