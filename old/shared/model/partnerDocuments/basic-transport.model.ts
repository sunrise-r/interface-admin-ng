export interface IBasicTransport {
    id?: number;
}

export class BasicTransport implements IBasicTransport {
    constructor(public id?: number) {}
}
