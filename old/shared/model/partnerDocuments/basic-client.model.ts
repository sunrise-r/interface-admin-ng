export interface IBasicClient {
    id?: number;
}

export class BasicClient implements IBasicClient {
    constructor(public id?: number) {}
}
