export interface IDuitiesRestorationCorrection {
    id?: number;
    employeeId?: number;
}

export class DuitiesRestorationCorrection implements IDuitiesRestorationCorrection {
    constructor(public id?: number, public employeeId?: number) {}
}
