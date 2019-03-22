import { Moment } from 'moment';
import { IOwnerOfBypasses } from 'app/shared/model/partnerDocuments/owner-of-bypasses.model';

export interface IStorage {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
    notesToTheAddress?: string;
    unloadingAddressId?: number;
    railwayRequisitesId?: number;
    ownerOfBypasses?: IOwnerOfBypasses[];
}

export class Storage implements IStorage {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public description?: string,
        public notesToTheAddress?: string,
        public unloadingAddressId?: number,
        public railwayRequisitesId?: number,
        public ownerOfBypasses?: IOwnerOfBypasses[]
    ) {}
}
