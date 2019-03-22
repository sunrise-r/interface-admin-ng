import { Moment } from 'moment';

export interface IPublicNews {
    id?: number;
    creationDate?: Moment;
    topic?: string;
    news?: string;
}

export class PublicNews implements IPublicNews {
    constructor(public id?: number, public creationDate?: Moment, public topic?: string, public news?: string) {}
}
