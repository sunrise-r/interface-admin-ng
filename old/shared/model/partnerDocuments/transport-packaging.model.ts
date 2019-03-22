export interface ITransportPackaging {
    id?: number;
    code?: string;
    label?: string;
}

export class TransportPackaging implements ITransportPackaging {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
