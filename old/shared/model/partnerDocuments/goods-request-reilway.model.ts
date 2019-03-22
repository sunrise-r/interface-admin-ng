import { Moment } from 'moment';

export interface IGoodsRequestReilway {
    id?: number;
    creationDate?: Moment;
    number?: number;
    additionalInfo?: string;
    registrationDataId?: number;
    providerId?: number;
    contractId?: number;
    goodsId?: number;
    railwayCharacteristicsId?: number;
    unloadingAddressId?: number;
    consigneeId?: number;
}

export class GoodsRequestReilway implements IGoodsRequestReilway {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public additionalInfo?: string,
        public registrationDataId?: number,
        public providerId?: number,
        public contractId?: number,
        public goodsId?: number,
        public railwayCharacteristicsId?: number,
        public unloadingAddressId?: number,
        public consigneeId?: number
    ) {}
}
