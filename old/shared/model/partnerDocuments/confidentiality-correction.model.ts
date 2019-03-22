export interface IConfidentialityCorrection {
    id?: number;
    privacyId?: number;
}

export class ConfidentialityCorrection implements IConfidentialityCorrection {
    constructor(public id?: number, public privacyId?: number) {}
}
