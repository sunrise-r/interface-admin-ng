import { Moment } from 'moment';

export interface IInnerNews {
    id?: number;
    creationDate?: Moment;
    topic?: string;
    news?: string;
}

export class InnerNews implements IInnerNews {
    constructor(public id?: number, public creationDate?: Moment, public topic?: string, public news?: string) {}
}
