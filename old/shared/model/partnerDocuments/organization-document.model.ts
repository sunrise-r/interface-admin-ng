import { Moment } from 'moment';

export interface IOrganizationDocument {
    id?: number;
    creationDate?: Moment;
    name?: string;
    blankNumber?: string;
    series?: string;
    number?: string;
    issuedBy?: string;
    beginningDate?: Moment;
    finishingDate?: Moment;
}

export class OrganizationDocument implements IOrganizationDocument {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public blankNumber?: string,
        public series?: string,
        public number?: string,
        public issuedBy?: string,
        public beginningDate?: Moment,
        public finishingDate?: Moment
    ) {}
}
