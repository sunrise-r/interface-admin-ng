import { Moment } from 'moment';

export interface ITruckTractor {
    id?: number;
    creationDate?: Moment;
    brand?: string;
    model?: string;
    stateNumberId?: number;
}

export class TruckTractor implements ITruckTractor {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public brand?: string,
        public model?: string,
        public stateNumberId?: number
    ) {}
}
