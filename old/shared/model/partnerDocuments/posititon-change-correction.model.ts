export interface IPosititonChangeCorrection {
    id?: number;
    employeeId?: number;
    postitonId?: number;
}

export class PosititonChangeCorrection implements IPosititonChangeCorrection {
    constructor(public id?: number, public employeeId?: number, public postitonId?: number) {}
}
