export interface IProvider {
    id?: number;
    providerId?: number;
}

export class Provider implements IProvider {
    constructor(public id?: number, public providerId?: number) {}
}
