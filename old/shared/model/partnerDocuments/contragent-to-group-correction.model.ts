export interface IContragentToGroupCorrection {
    id?: number;
    documentGroupId?: number;
    basicClientId?: number;
}

export class ContragentToGroupCorrection implements IContragentToGroupCorrection {
    constructor(public id?: number, public documentGroupId?: number, public basicClientId?: number) {}
}
