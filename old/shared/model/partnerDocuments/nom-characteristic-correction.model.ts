export interface INomCharacteristicCorrection {
    id?: number;
    characteristicsId?: number;
}

export class NomCharacteristicCorrection implements INomCharacteristicCorrection {
    constructor(public id?: number, public characteristicsId?: number) {}
}
