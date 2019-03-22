import { Moment } from 'moment';

export interface IRequestToParticipation {
    id?: number;
    creationDate?: Moment;
    number?: number;
}

export class RequestToParticipation implements IRequestToParticipation {
    constructor(public id?: number, public creationDate?: Moment, public number?: number) {}
}
