export interface IWebSite {
    id?: number;
    code?: string;
    label?: string;
    profileRegistrationDataId?: number;
    organizationClientId?: number;
    soleProprietorClientId?: number;
}

export class WebSite implements IWebSite {
    constructor(
        public id?: number,
        public code?: string,
        public label?: string,
        public profileRegistrationDataId?: number,
        public organizationClientId?: number,
        public soleProprietorClientId?: number
    ) {}
}
