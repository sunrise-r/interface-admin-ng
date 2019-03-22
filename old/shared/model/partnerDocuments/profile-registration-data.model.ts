import { ISocial } from 'app/shared/model/partnerDocuments/social.model';
import { IWebSite } from 'app/shared/model/partnerDocuments/web-site.model';

export interface IProfileRegistrationData {
    id?: number;
    pastalAddressId?: number;
    factAddressId?: number;
    phoneNumbersId?: number;
    emailAddressesId?: number;
    socials?: ISocial[];
    webSaits?: IWebSite[];
}

export class ProfileRegistrationData implements IProfileRegistrationData {
    constructor(
        public id?: number,
        public pastalAddressId?: number,
        public factAddressId?: number,
        public phoneNumbersId?: number,
        public emailAddressesId?: number,
        public socials?: ISocial[],
        public webSaits?: IWebSite[]
    ) {}
}
