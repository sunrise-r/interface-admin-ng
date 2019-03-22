import { Moment } from 'moment';

export interface IInviteToParticipation {
    id?: number;
    creationDate?: Moment;
    number?: number;
}

export class InviteToParticipation implements IInviteToParticipation {
    constructor(public id?: number, public creationDate?: Moment, public number?: number) {}
}
