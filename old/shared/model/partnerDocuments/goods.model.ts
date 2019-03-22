import { Moment } from 'moment';

export interface IGoods {
    id?: number;
    creationDate?: Moment;
    name?: string;
    trademark?: string;
    description?: string;
    productTypeId?: number;
    manufacturerId?: number;
    packerId?: number;
    codesId?: number;
    technicalConditionsId?: number;
}

export class Goods implements IGoods {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public trademark?: string,
        public description?: string,
        public productTypeId?: number,
        public manufacturerId?: number,
        public packerId?: number,
        public codesId?: number,
        public technicalConditionsId?: number
    ) {}
}
