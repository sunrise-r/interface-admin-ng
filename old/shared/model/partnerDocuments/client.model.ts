export interface IClient {
    id?: number;
}

export class Client implements IClient {
    constructor(public id?: number) {}
}
