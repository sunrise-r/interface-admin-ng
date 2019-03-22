import { Moment } from 'moment';

export interface IOwnerOfBypasses {
    id?: number;
    creationDate?: Moment;
    type?: string;
    legalPersonDataId?: number;
    storageId?: number;
}

export class OwnerOfBypasses implements IOwnerOfBypasses {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public type?: string,
        public legalPersonDataId?: number,
        public storageId?: number
    ) {}
}
