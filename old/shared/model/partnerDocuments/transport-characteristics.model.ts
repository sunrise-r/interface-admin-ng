export interface ITransportCharacteristics {
    id?: number;
    bodyTypeId?: number;
    bootMethodId?: number;
}

export class TransportCharacteristics implements ITransportCharacteristics {
    constructor(public id?: number, public bodyTypeId?: number, public bootMethodId?: number) {}
}
