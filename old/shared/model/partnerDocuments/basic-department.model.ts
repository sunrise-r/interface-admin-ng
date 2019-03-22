export interface IBasicDepartment {
    id?: number;
}

export class BasicDepartment implements IBasicDepartment {
    constructor(public id?: number) {}
}
