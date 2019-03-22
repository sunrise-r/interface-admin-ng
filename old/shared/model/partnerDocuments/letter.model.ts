import { Moment } from 'moment';

export interface ILetter {
    id?: number;
    creationDate?: Moment;
    number?: number;
    topic?: string;
    description?: string;
    importDocumentId?: number;
}

export class Letter implements ILetter {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public topic?: string,
        public description?: string,
        public importDocumentId?: number
    ) {}
}
