import { Moment } from 'moment';

export interface IServiceRequest {
    id?: number;
    creationDate?: Moment;
    number?: number;
    registrationDataId?: number;
    providerId?: number;
    contractId?: number;
    serviceId?: number;
    unloadingAddressId?: number;
    consigneeId?: number;
}

export class ServiceRequest implements IServiceRequest {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public registrationDataId?: number,
        public providerId?: number,
        public contractId?: number,
        public serviceId?: number,
        public unloadingAddressId?: number,
        public consigneeId?: number
    ) {}
}
