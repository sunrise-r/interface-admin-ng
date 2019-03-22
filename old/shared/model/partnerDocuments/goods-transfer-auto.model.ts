import { Moment } from 'moment';

export interface IGoodsTransferAuto {
    id?: number;
    creationDate?: Moment;
    number?: number;
    storageFromId?: number;
    destinationStorageId?: number;
    goodsId?: number;
    vehicleCharacteristicsId?: number;
}

export class GoodsTransferAuto implements IGoodsTransferAuto {
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
