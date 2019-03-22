export interface IDriverCategory {
    id?: number;
    code?: string;
    label?: string;
}

export class DriverCategory implements IDriverCategory {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
