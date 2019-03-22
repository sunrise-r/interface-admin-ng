import { IPhoto } from 'app/shared/model/partnerDocuments/photo.model';

export interface IPhotoCorrection {
    id?: number;
    photos?: IPhoto[];
}

export class PhotoCorrection implements IPhotoCorrection {
    constructor(public id?: number, public photos?: IPhoto[]) {}
}
