import { Moment } from 'moment';

export interface IContract {
    id?: number;
    creationDate?: Moment;
    startDate?: Moment;
    endDate?: Moment;
    number?: string;
    branchId?: number;
    templateId?: number;
    signerId?: number;
    clientSignerId?: number;
}

export class Contract implements IContract {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public startDate?: Moment,
        public endDate?: Moment,
        public number?: string,
        public branchId?: number,
        public templateId?: number,
        public signerId?: number,
        public clientSignerId?: number
    ) {}
}
