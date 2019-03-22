export interface IBodyType {
    id?: number;
    code?: string;
    label?: string;
}

export class BodyType implements IBodyType {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
