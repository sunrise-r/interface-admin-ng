import { Moment } from 'moment';

export interface ITrailer {
    id?: number;
    creationDate?: Moment;
    brand?: string;
    model?: string;
    stateNumberId?: number;
    vehicleCharacteristicId?: number;
}

export class Trailer implements ITrailer {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public brand?: string,
        public model?: string,
        public stateNumberId?: number,
        public vehicleCharacteristicId?: number
    ) {}
}
