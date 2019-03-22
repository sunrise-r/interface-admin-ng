export interface IVehicleRegistrationData {
    id?: number;
    yearOfIssue?: string;
    vin?: string;
    engineNumber?: string;
    chassisNumber?: string;
    bodyNumber?: string;
    environmentalClass?: string;
    vehicleColor?: string;
    enginePower?: string;
    engineCapacity?: string;
    vehicleMass?: string;
    weightWithoutLoad?: string;
    axleConfigurationId?: number;
    driverCategoryId?: number;
}

export class VehicleRegistrationData implements IVehicleRegistrationData {
    constructor(
        public id?: number,
        public yearOfIssue?: string,
        public vin?: string,
        public engineNumber?: string,
        public chassisNumber?: string,
        public bodyNumber?: string,
        public environmentalClass?: string,
        public vehicleColor?: string,
        public enginePower?: string,
        public engineCapacity?: string,
        public vehicleMass?: string,
        public weightWithoutLoad?: string,
        public axleConfigurationId?: number,
        public driverCategoryId?: number
    ) {}
}
