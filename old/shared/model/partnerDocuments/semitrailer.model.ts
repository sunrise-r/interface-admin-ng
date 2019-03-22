import { Moment } from 'moment';

export interface ISemitrailer {
    id?: number;
    creationDate?: Moment;
    brand?: string;
    model?: string;
    stateNumberId?: number;
    vehicleCharacteristicId?: number;
}

export class Semitrailer implements ISemitrailer {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public brand?: string,
        public model?: string,
        public stateNumberId?: number,
        public vehicleCharacteristicId?: number
    ) {}
}
