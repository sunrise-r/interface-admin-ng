import { Moment } from 'moment';

export interface IVehicleDocumentsGroup {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
}

export class VehicleDocumentsGroup implements IVehicleDocumentsGroup {
    constructor(public id?: number, public creationDate?: Moment, public name?: string, public description?: string) {}
}
