import { Moment } from 'moment';

export interface IGoodsRequestAuto {
    id?: number;
    creationDate?: Moment;
    number?: number;
    additionalInfo?: string;
    registrationDataId?: number;
    providerId?: number;
    contractId?: number;
    goodsId?: number;
    vehicleCharacteristicsId?: number;
    unloadingAddressId?: number;
    consigneeId?: number;
}

export class GoodsRequestAuto implements IGoodsRequestAuto {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public additionalInfo?: string,
        public registrationDataId?: number,
        public providerId?: number,
        public contractId?: number,
        public goodsId?: number,
        public vehicleCharacteristicsId?: number,
        public unloadingAddressId?: number,
        public consigneeId?: number
    ) {}
}
