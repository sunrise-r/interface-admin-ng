export interface IDutiesRestorationCorrection {
    id?: number;
    employeeId?: number;
}

export class DutiesRestorationCorrection implements IDutiesRestorationCorrection {
    constructor(public id?: number, public employeeId?: number) {}
}
