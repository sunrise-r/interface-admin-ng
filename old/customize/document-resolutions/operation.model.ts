import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/partnerDocuments/employee.model';
import { IResolution } from 'app/customize/document-resolutions/resolution.model';

export interface IOperation {
    authorId?: number;
    author?: IEmployee;
    creationDate?: Moment;
    documentId?: number;
    id?: number;
    resolutions?: IResolution[];
    type?: string; // new
    status?: string; // Статус операции , напр, processed
}

export class Operation implements IOperation {
    constructor(
        public authorId?: number,
        public author?: IEmployee,
        public creationDate?: Moment,
        public documentId?: number,
        public id?: number,
        public resolutions?: IResolution[],
        public type?: string, // new
        public status?: string
    ) {}
}
