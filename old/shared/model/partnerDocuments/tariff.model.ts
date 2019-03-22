export interface ITariff {
    id?: number;
    price?: number;
    unitsId?: number;
    taxId?: number;
}

export class Tariff implements ITariff {
    constructor(public id?: number, public price?: number, public unitsId?: number, public taxId?: number) {}
}
