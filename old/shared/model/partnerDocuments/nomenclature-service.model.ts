import { Moment } from 'moment';

export interface INomenclatureService {
    id?: number;
    creationDate?: Moment;
    name?: string;
    trademark?: string;
    description?: string;
    manufacturerId?: number;
    codeOKUNId?: number;
    technicalConditionsId?: number;
}

export class NomenclatureService implements INomenclatureService {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public trademark?: string,
        public description?: string,
        public manufacturerId?: number,
        public codeOKUNId?: number,
        public technicalConditionsId?: number
    ) {}
}
