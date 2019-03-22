import { Moment } from 'moment';

export interface IContractAvoidanceApplication {
    id?: number;
    creationDate?: Moment;
    number?: string;
    startDate?: Moment;
    avoidaceDate?: Moment;
    reason?: string;
    contractId?: number;
    templateId?: number;
}

export class ContractAvoidanceApplication implements IContractAvoidanceApplication {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: string,
        public startDate?: Moment,
        public avoidaceDate?: Moment,
        public reason?: string,
        public contractId?: number,
        public templateId?: number
    ) {}
}
