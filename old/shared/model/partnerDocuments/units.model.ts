export interface IUnits {
    id?: number;
    code?: string;
    label?: string;
}

export class Units implements IUnits {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
