import { Moment } from 'moment';
import { ICertificate } from 'app/shared/model/partnerDocuments/certificate.model';

export interface IAccountLocalCertificate {
    id?: number;
    creationDate?: Moment;
    sertificates?: ICertificate[];
}

export class AccountLocalCertificate implements IAccountLocalCertificate {
    constructor(public id?: number, public creationDate?: Moment, public sertificates?: ICertificate[]) {}
}
