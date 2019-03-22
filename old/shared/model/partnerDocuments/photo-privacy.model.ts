export interface IPhotoPrivacy {
    id?: number;
    code?: string;
    label?: string;
}

export class PhotoPrivacy implements IPhotoPrivacy {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
