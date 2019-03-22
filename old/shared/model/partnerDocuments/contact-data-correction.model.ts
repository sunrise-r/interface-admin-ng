import { ISocial } from 'app/shared/model/partnerDocuments/social.model';

export interface IContactDataCorrection {
    id?: number;
    webSite?: string;
    employeeId?: number;
    legalAddressId?: number;
    actualAddressId?: number;
    postalAddressId?: number;
    phoneNumbersId?: number;
    emailAddressesId?: number;
    socials?: ISocial[];
}

export class ContactDataCorrection implements IContactDataCorrection {
    constructor(
        public id?: number,
        public webSite?: string,
        public employeeId?: number,
        public legalAddressId?: number,
        public actualAddressId?: number,
        public postalAddressId?: number,
        public phoneNumbersId?: number,
        public emailAddressesId?: number,
        public socials?: ISocial[]
    ) {}
}
