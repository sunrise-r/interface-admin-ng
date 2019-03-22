import { Moment } from 'moment';

export interface IGoodsRequestAutoOnBase {
    id?: number;
    creationDate?: Moment;
    number?: number;
    additionalInfo?: string;
    requestId?: number;
    registrationDataId?: number;
    providerId?: number;
    contractId?: number;
    goodsId?: number;
    vehicleCharacteristicsId?: number;
    unloadingAddressId?: number;
    consigneeId?: number;
}

export class GoodsRequestAutoOnBase implements IGoodsRequestAutoOnBase {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public additionalInfo?: string,
        public requestId?: number,
        public registrationDataId?: number,
        public providerId?: number,
        public contractId?: number,
        public goodsId?: number,
        public vehicleCharacteristicsId?: number,
        public unloadingAddressId?: number,
        public consigneeId?: number
    ) {}
}
