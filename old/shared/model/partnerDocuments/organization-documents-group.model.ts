import { Moment } from 'moment';

export interface IOrganizationDocumentsGroup {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
}

export class OrganizationDocumentsGroup implements IOrganizationDocumentsGroup {
    constructor(public id?: number, public creationDate?: Moment, public name?: string, public description?: string) {}
}
