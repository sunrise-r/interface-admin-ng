import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/partnerDocuments/employee.model';

export interface ITransportUnits {
    id?: number;
    creationDate?: Moment;
    name?: string;
    startingDate?: Moment;
    finishingDate?: Moment;
    unitCharacteristicsId?: number;
    employes?: IEmployee[];
}

export class TransportUnits implements ITransportUnits {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public startingDate?: Moment,
        public finishingDate?: Moment,
        public unitCharacteristicsId?: number,
        public employes?: IEmployee[]
    ) {}
}
