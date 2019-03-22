import { Moment } from 'moment';

export interface IIndividualCorrespondence {
    id?: number;
    creationDate?: Moment;
    number?: number;
    topic?: string;
    description?: string;
    signatoriesId?: number;
    addressId?: number;
    importDocumentId?: number;
}

export class IndividualCorrespondence implements IIndividualCorrespondence {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public topic?: string,
        public description?: string,
        public signatoriesId?: number,
        public addressId?: number,
        public importDocumentId?: number
    ) {}
}
