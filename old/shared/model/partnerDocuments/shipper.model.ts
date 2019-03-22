import { Moment } from 'moment';

export interface IShipper {
    id?: number;
    additionalCharacteristic?: string;
    name?: string;
    surname?: string;
    patronymic?: string;
    phone1?: string;
    phone2?: string;
    date?: Moment;
    time?: Moment;
    consignerId?: number;
    addressId?: number;
}

export class Shipper implements IShipper {
    constructor(
        public id?: number,
        public additionalCharacteristic?: string,
        public name?: string,
        public surname?: string,
        public patronymic?: string,
        public phone1?: string,
        public phone2?: string,
        public date?: Moment,
        public time?: Moment,
        public consignerId?: number,
        public addressId?: number
    ) {}
}
