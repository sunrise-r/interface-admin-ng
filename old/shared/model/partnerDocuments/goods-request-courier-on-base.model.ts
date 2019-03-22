import { Moment } from 'moment';

export interface IGoodsRequestCourierOnBase {
    id?: number;
    creationDate?: Moment;
    number?: number;
    additionalInfo?: string;
    requestId?: number;
    registrationDataId?: number;
    contractId?: number;
    goodsId?: number;
    unloadingAddressId?: number;
    consigneeId?: number;
}

export class GoodsRequestCourierOnBase implements IGoodsRequestCourierOnBase {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public additionalInfo?: string,
        public requestId?: number,
        public registrationDataId?: number,
        public contractId?: number,
        public goodsId?: number,
        public unloadingAddressId?: number,
        public consigneeId?: number
    ) {}
}
