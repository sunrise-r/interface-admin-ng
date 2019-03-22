import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/partnerDocuments/employee.model';

export interface IOrganizationCorrespondence {
    id?: number;
    creationDate?: Moment;
    number?: number;
    topic?: string;
    description?: string;
    signatoriesId?: number;
    addresseId?: number;
    importDocumentId?: number;
    subscriberSignatureId?: number;
    signatories?: IEmployee[];
}

export class OrganizationCorrespondence implements IOrganizationCorrespondence {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public topic?: string,
        public description?: string,
        public signatoriesId?: number,
        public addresseId?: number,
        public importDocumentId?: number,
        public subscriberSignatureId?: number,
        public signatories?: IEmployee[]
    ) {}
}
