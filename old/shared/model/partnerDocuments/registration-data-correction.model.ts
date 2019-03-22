export interface IRegistrationDataCorrection {
    id?: number;
    registrationDataId?: number;
}

export class RegistrationDataCorrection implements IRegistrationDataCorrection {
    constructor(public id?: number, public registrationDataId?: number) {}
}
