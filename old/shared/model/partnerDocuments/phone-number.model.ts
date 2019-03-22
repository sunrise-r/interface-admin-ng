export interface IPhoneNumber {
    id?: number;
    code?: string;
    label?: string;
    organizationClientId?: number;
    soleProprietorClientId?: number;
}

export class PhoneNumber implements IPhoneNumber {
    constructor(
        public id?: number,
        public code?: string,
        public label?: string,
        public organizationClientId?: number,
        public soleProprietorClientId?: number
    ) {}
}
