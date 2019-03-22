import { Moment } from 'moment';

export interface IAccountCloudCertificate {
    id?: number;
    creationDate?: Moment;
    codeFromSMS?: string;
    guidId?: number;
}

export class AccountCloudCertificate implements IAccountCloudCertificate {
    constructor(public id?: number, public creationDate?: Moment, public codeFromSMS?: string, public guidId?: number) {}
}
