export interface IEmployeeTransfer {
    id?: number;
    employeeId?: number;
    branchesId?: number;
}

export class EmployeeTransfer implements IEmployeeTransfer {
    constructor(public id?: number, public employeeId?: number, public branchesId?: number) {}
}
