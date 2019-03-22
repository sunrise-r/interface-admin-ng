import { Moment } from 'moment';

export interface IRecords {
    id?: number;
    creationDate?: Moment;
    beginningDate?: Moment;
    finishingDate?: Moment;
    startingTime?: Moment;
    finishingTime?: Moment;
    topic?: string;
    description?: string;
}

export class Records implements IRecords {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public beginningDate?: Moment,
        public finishingDate?: Moment,
        public startingTime?: Moment,
        public finishingTime?: Moment,
        public topic?: string,
        public description?: string
    ) {}
}
