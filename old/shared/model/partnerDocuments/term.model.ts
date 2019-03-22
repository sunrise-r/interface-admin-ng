import { Moment } from 'moment';

export interface ITerm {
    id?: number;
    startingDate?: Moment;
    finishingDate?: Moment;
}

export class Term implements ITerm {
    constructor(public id?: number, public startingDate?: Moment, public finishingDate?: Moment) {}
}
