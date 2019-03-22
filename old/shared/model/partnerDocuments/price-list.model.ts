import { Moment } from 'moment';

export interface IPriceList {
    id?: number;
    creationDate?: Moment;
    name?: string;
    publicPrice?: boolean;
    startingDate?: Moment;
    validDate?: Moment;
    currency?: string;
    description?: string;
    nomenclatureId?: number;
}

export class PriceList implements IPriceList {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public publicPrice?: boolean,
        public startingDate?: Moment,
        public validDate?: Moment,
        public currency?: string,
        public description?: string,
        public nomenclatureId?: number
    ) {
        this.publicPrice = this.publicPrice || false;
    }
}
