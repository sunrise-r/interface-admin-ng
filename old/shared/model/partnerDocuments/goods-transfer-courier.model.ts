import { Moment } from 'moment';

export interface IGoodsTransferCourier {
    id?: number;
    creationDate?: Moment;
    number?: number;
    storageFromId?: number;
    destinationStorageId?: number;
    goodsId?: number;
}

export class GoodsTransferCourier implements IGoodsTransferCourier {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public storageFromId?: number,
        public destinationStorageId?: number,
        public goodsId?: number
    ) {}
}
