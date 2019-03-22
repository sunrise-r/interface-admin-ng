import { ICharacteristicsName } from 'app/shared/model/partnerDocuments/characteristics-name.model';

export interface ICharacteristics {
    id?: number;
    value?: string;
    unitsId?: number;
    specifications?: ICharacteristicsName[];
}

export class Characteristics implements ICharacteristics {
    constructor(public id?: number, public value?: string, public unitsId?: number, public specifications?: ICharacteristicsName[]) {}
}
