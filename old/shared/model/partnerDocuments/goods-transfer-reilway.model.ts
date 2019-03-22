import { Moment } from 'moment';

export interface IGoodsTransferReilway {
    id?: number;
    creationDate?: Moment;
    number?: number;
    storageFromId?: number;
    destinationStorageId?: number;
    goodsId?: number;
    vehicleCharacteristicsId?: number;
}

export class GoodsTransferReilway implements IGoodsTransferReilway {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public storageFromId?: number,
        public destinationStorageId?: number,
        public goodsId?: number,
        public vehicleCharacteristicsId?: number
    ) {}
}
