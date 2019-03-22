import { Moment } from 'moment';

export interface IProtocol {
    id?: number;
    creationDate?: Moment;
    number?: number;
    topic?: string;
    description?: string;
    importDocumentId?: number;
}

export class Protocol implements IProtocol {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public topic?: string,
        public description?: string,
        public importDocumentId?: number
    ) {}
}
