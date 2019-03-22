import { IPhoto } from 'app/shared/model/partnerDocuments/photo.model';

export const enum NewsType {
    INNER = 'INNER',
    PUBLIC = 'PUBLIC'
}

export interface INews {
    id?: number;
    topic?: string;
    news?: string;
    newsType?: NewsType;
    photos?: IPhoto[];
}

export class News implements INews {
    constructor(public id?: number, public topic?: string, public news?: string, public newsType?: NewsType, public photos?: IPhoto[]) {}
}
