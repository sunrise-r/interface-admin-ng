import { Moment } from 'moment';

export interface IGoodsReceipt {
    id?: number;
    creationDate?: Moment;
    number?: number;
    storageFromId?: number;
    goodsId?: number;
}

export class GoodsReceipt implements IGoodsReceipt {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public storageFromId?: number,
        public goodsId?: number
    ) {}
}
