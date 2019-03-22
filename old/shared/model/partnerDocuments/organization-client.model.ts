import { Moment } from 'moment';
import { IPhoneNumber } from 'app/shared/model/partnerDocuments/phone-number.model';
import { ISocial } from 'app/shared/model/partnerDocuments/social.model';
import { IWebSite } from 'app/shared/model/partnerDocuments/web-site.model';

export interface IOrganizationClient {
    id?: number;
    creationDate?: Moment;
    legalAddress?: string;
    factAddress?: string;
    postAddress?: string;
    clientStatus?: string;
    legalPersonId?: number;
    phones?: IPhoneNumber[];
    socials?: ISocial[];
    webSaits?: IWebSite[];
}

export class OrganizationClient implements IOrganizationClient {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public legalAddress?: string,
        public factAddress?: string,
        public postAddress?: string,
        public clientStatus?: string,
        public legalPersonId?: number,
        public phones?: IPhoneNumber[],
        public socials?: ISocial[],
        public webSaits?: IWebSite[]
    ) {}
}
