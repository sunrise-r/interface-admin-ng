export interface IVehicleDataRegCorrection {
    id?: number;
    vehicleRegistrationDataId?: number;
}

export class VehicleDataRegCorrection implements IVehicleDataRegCorrection {
    constructor(public id?: number, public vehicleRegistrationDataId?: number) {}
}
