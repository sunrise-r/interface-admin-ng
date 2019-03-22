export interface IUnitChracteristic {
    id?: number;
    vehicleType?: string;
    vehicleClass?: string;
    vehicleCharacteristicId?: number;
}

export class UnitChracteristic implements IUnitChracteristic {
    constructor(public id?: number, public vehicleType?: string, public vehicleClass?: string, public vehicleCharacteristicId?: number) {}
}
