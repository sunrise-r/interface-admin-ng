import { Moment } from 'moment';

export interface INomenclatureDocumentsGroup {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
}

export class NomenclatureDocumentsGroup implements INomenclatureDocumentsGroup {
    constructor(public id?: number, public creationDate?: Moment, public name?: string, public description?: string) {}
}
