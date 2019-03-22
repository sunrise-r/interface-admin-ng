import { Moment } from 'moment';

export interface IAgreement {
    id?: number;
    type?: string;
    date?: Moment;
    userId?: number;
}

export class Agreement implements IAgreement {
    constructor(public id?: number, public type?: string, public date?: Moment, public userId?: number) {}
}
