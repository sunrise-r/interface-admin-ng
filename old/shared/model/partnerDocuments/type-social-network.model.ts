export interface ITypeSocialNetwork {
    id?: number;
    code?: string;
    label?: string;
}

export class TypeSocialNetwork implements ITypeSocialNetwork {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
