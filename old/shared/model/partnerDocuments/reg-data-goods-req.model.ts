import { Moment } from 'moment';

export interface IRegDataGoodsReq {
    id?: number;
    dateOfUnloading?: Moment;
    timeOfUnloading?: Moment;
    typeOfUnloadingId?: number;
}

export class RegDataGoodsReq implements IRegDataGoodsReq {
    constructor(public id?: number, public dateOfUnloading?: Moment, public timeOfUnloading?: Moment, public typeOfUnloadingId?: number) {}
}
