export interface IBasicDocument {
    id?: number;
}

export class BasicDocument implements IBasicDocument {
    constructor(public id?: number) {}
}
