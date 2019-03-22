export interface IExecutorCorrection {
    id?: number;
    employeeId?: number;
}

export class ExecutorCorrection implements IExecutorCorrection {
    constructor(public id?: number, public employeeId?: number) {}
}
