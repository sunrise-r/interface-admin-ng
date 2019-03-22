import { Moment } from 'moment';

export interface IEmployeesDocumentsGroup {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
}

export class EmployeesDocumentsGroup implements IEmployeesDocumentsGroup {
    constructor(public id?: number, public creationDate?: Moment, public name?: string, public description?: string) {}
}
