import { Moment } from 'moment';

export interface IOperationListModel {
    id: number;
    creationDate?: Moment;
    documentAuthor?: string;
    documentCreationDate?: Moment;
    documentName?: string;
    documentNumber?: string;
    documentType?: string;
    operationType?: string;
    resolutionGroup?: string;
    status?: string;
    type?: string;
}

export class OperationListModel implements IOperationListModel {
    constructor(
        public id: number,
        public creationDate?: Moment,
        public documentAuthor?: string,
        public documentCreationDate?: Moment,
        public documentName?: string,
        public documentNumber?: string,
        public documentType?: string,
        public operationType?: string,
        public resolutionGroup?: string,
        public status?: string,
        public type?: string
    ) {}
}
