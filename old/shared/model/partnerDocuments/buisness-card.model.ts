import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/partnerDocuments/employee.model';

export interface IBuisnessCard {
    id?: number;
    creationDate?: Moment;
    employes?: IEmployee[];
}

export class BuisnessCard implements IBuisnessCard {
    constructor(public id?: number, public creationDate?: Moment, public employes?: IEmployee[]) {}
}
