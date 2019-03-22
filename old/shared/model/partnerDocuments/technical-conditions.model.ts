export interface ITechnicalConditions {
    id?: number;
    number?: string;
    nameId?: number;
}

export class TechnicalConditions implements ITechnicalConditions {
    constructor(public id?: number, public number?: string, public nameId?: number) {}
}
