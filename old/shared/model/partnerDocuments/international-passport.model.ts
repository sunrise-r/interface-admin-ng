import { Moment } from 'moment';

export interface IInternationalPassport {
    id?: number;
    creationDate?: Moment;
    series?: string;
    number?: string;
    issuedBy?: string;
    beginningDate?: Moment;
    finishingDate?: Moment;
    employesId?: number;
}

export class InternationalPassport implements IInternationalPassport {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public series?: string,
        public number?: string,
        public issuedBy?: string,
        public beginningDate?: Moment,
        public finishingDate?: Moment,
        public employesId?: number
    ) {}
}
