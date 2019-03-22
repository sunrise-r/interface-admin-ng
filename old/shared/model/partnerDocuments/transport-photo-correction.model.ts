import { IPhoto } from 'app/shared/model/partnerDocuments/photo.model';

export interface ITransportPhotoCorrection {
    id?: number;
    photos?: IPhoto[];
}

export class TransportPhotoCorrection implements ITransportPhotoCorrection {
    constructor(public id?: number, public photos?: IPhoto[]) {}
}
