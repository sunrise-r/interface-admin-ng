import { Moment } from 'moment';

export interface INomenclature {
    id?: number;
    creationDate?: Moment;
    name?: string;
    blankNumber?: string;
    series?: string;
    number?: number;
    issuedBy?: string;
    beginningDate?: Moment;
    finishingDate?: Moment;
    nomenclatureId?: number;
    stockListId?: number;
}

export class Nomenclature implements INomenclature {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public blankNumber?: string,
        public series?: string,
        public number?: number,
        public issuedBy?: string,
        public beginningDate?: Moment,
        public finishingDate?: Moment,
        public nomenclatureId?: number,
        public stockListId?: number
    ) {}
}
