export interface IPositionChangeCorrection {
    id?: number;
    employeeId?: number;
    postitonId?: number;
}

export class PositionChangeCorrection implements IPositionChangeCorrection {
    constructor(public id?: number, public employeeId?: number, public postitonId?: number) {}
}
