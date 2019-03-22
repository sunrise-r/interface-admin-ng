import { Moment } from 'moment';

export interface IContractSpecApplication {
    id?: number;
    creationDate?: Moment;
    startDate?: Moment;
    endDate?: Moment;
    number?: string;
    contractId?: number;
    templateId?: number;
    priceListId?: number;
}

export class ContractSpecApplication implements IContractSpecApplication {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public startDate?: Moment,
        public endDate?: Moment,
        public number?: string,
        public contractId?: number,
        public templateId?: number,
        public priceListId?: number
    ) {}
}
