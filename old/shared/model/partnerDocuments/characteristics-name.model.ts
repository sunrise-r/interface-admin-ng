import { Moment } from 'moment';

export interface ICharacteristicsName {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
    characteristicsId?: number;
}

export class CharacteristicsName implements ICharacteristicsName {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public description?: string,
        public characteristicsId?: number
    ) {}
}
