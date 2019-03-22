import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/partnerDocuments/employee.model';

export interface IOrganizationDepartment {
    id?: number;
    name?: string;
    creationDate?: Moment;
    description?: string;
    employees?: IEmployee[];
}

export class OrganizationDepartment implements IOrganizationDepartment {
    constructor(
        public id?: number,
        public name?: string,
        public creationDate?: Moment,
        public description?: string,
        public employees?: IEmployee[]
    ) {}
}
