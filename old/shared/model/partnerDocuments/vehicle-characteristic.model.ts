export interface IVehicleCharacteristic {
    id?: number;
    carryingCapacity?: string;
    volume?: string;
    length?: string;
    width?: string;
    height?: string;
    bodyTypeId?: number;
    bootMethodId?: number;
    unloadingMethodId?: number;
}

export class VehicleCharacteristic implements IVehicleCharacteristic {
    constructor(
        public id?: number,
        public carryingCapacity?: string,
        public volume?: string,
        public length?: string,
        public width?: string,
        public height?: string,
        public bodyTypeId?: number,
        public bootMethodId?: number,
        public unloadingMethodId?: number
    ) {}
}
