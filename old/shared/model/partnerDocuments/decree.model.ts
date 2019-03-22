import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/partnerDocuments/employee.model';

export interface IDecree {
    id?: number;
    creationDate?: Moment;
    number?: number;
    topic?: string;
    description?: string;
    importDocumentId?: number;
    employes?: IEmployee[];
}

export class Decree implements IDecree {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public topic?: string,
        public description?: string,
        public importDocumentId?: number,
        public employes?: IEmployee[]
    ) {}
}
