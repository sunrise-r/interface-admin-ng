import { Moment } from 'moment';

export interface IIndividualsClient {
    id?: number;
    creationDate?: Moment;
    individualsId?: number;
}

export class IndividualsClient implements IIndividualsClient {
    constructor(public id?: number, public creationDate?: Moment, public individualsId?: number) {}
}
