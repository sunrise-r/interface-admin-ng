import { Moment } from 'moment';

export interface ICustomersGroup {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
}

export class CustomersGroup implements ICustomersGroup {
    constructor(public id?: number, public creationDate?: Moment, public name?: string, public description?: string) {}
}
