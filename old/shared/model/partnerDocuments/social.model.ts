export interface ISocial {
    id?: number;
    pathToProfile?: string;
    typeSocialNetworksId?: number;
    profileRegistrationDataId?: number;
    organizationClientId?: number;
    soleProprietorClientId?: number;
    contactDataCorrectionId?: number;
}

export class Social implements ISocial {
    constructor(
        public id?: number,
        public pathToProfile?: string,
        public typeSocialNetworksId?: number,
        public profileRegistrationDataId?: number,
        public organizationClientId?: number,
        public soleProprietorClientId?: number,
        public contactDataCorrectionId?: number
    ) {}
}
