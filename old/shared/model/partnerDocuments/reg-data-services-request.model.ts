import { Moment } from 'moment';

export interface IRegDataServicesRequest {
    id?: number;
    finishingDate?: Moment;
    finshingTime?: Moment;
}

export class RegDataServicesRequest implements IRegDataServicesRequest {
    constructor(public id?: number, public finishingDate?: Moment, public finshingTime?: Moment) {}
}
