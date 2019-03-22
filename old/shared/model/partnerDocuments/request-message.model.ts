import { Moment } from 'moment';

export interface IRequestMessage {
    id?: number;
    type?: string;
    date?: Moment;
    number?: number;
    targetId?: number;
}

export class RequestMessage implements IRequestMessage {
    constructor(public id?: number, public type?: string, public date?: Moment, public number?: number, public targetId?: number) {}
}
