import { Moment } from 'moment';

export interface IVehicleDocument {
    id?: number;
    creationDate?: Moment;
    name?: string;
    series?: string;
    number?: string;
    issuedBy?: string;
    beginningDate?: Moment;
    finishingDate?: Moment;
}

export class VehicleDocument implements IVehicleDocument {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public series?: string,
        public number?: string,
        public issuedBy?: string,
        public beginningDate?: Moment,
        public finishingDate?: Moment
    ) {}
}
