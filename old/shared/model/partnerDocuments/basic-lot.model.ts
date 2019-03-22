import { Moment } from 'moment';

export interface IBasicLot {
    id?: number;
    creationDate?: Moment;
    number?: number;
    natureOfGoodsId?: number;
    shipperId?: number;
    consigneeId?: number;
    vehicleCharacteristicsId?: number;
    tariffId?: number;
    paymentTermsId?: number;
    addiitionalDataId?: number;
}

export class BasicLot implements IBasicLot {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public natureOfGoodsId?: number,
        public shipperId?: number,
        public consigneeId?: number,
        public vehicleCharacteristicsId?: number,
        public tariffId?: number,
        public paymentTermsId?: number,
        public addiitionalDataId?: number
    ) {}
}
