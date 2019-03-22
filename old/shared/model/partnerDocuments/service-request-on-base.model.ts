import { Moment } from 'moment';

export interface IServiceRequestOnBase {
    id?: number;
    creationDate?: Moment;
    number?: number;
    requestId?: number;
    registrationDataId?: number;
    providerId?: number;
    contractId?: number;
    serviceId?: number;
    unloadingAddressId?: number;
    consigneeId?: number;
}

export class ServiceRequestOnBase implements IServiceRequestOnBase {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public requestId?: number,
        public registrationDataId?: number,
        public providerId?: number,
        public contractId?: number,
        public serviceId?: number,
        public unloadingAddressId?: number,
        public consigneeId?: number
    ) {}
}
