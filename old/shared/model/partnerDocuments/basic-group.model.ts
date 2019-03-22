export interface IBasicGroup {
    id?: number;
}

export class BasicGroup implements IBasicGroup {
    constructor(public id?: number) {}
}
