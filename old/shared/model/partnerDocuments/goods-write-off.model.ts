import { Moment } from 'moment';

export interface IGoodsWriteOff {
    id?: number;
    creationDate?: Moment;
    number?: number;
    storageFromId?: number;
    goodsId?: number;
}

export class GoodsWriteOff implements IGoodsWriteOff {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public storageFromId?: number,
        public goodsId?: number
    ) {}
}
