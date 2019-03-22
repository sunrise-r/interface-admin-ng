import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/partnerDocuments/employee.model';

export interface IWrit {
    id?: number;
    creationDate?: Moment;
    number?: string;
    topic?: string;
    description?: string;
    importDocumentId?: number;
    employes?: IEmployee[];
}

export class Writ implements IWrit {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: string,
        public topic?: string,
        public description?: string,
        public importDocumentId?: number,
        public employes?: IEmployee[]
    ) {}
}
