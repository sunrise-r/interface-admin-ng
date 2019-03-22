export interface IPriceListCorrection {
    id?: number;
    termId?: number;
    nomenclatureId?: number;
}

export class PriceListCorrection implements IPriceListCorrection {
    constructor(public id?: number, public termId?: number, public nomenclatureId?: number) {}
}
