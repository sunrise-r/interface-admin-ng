import { Moment } from 'moment';
import { INews } from 'app/shared/model/partnerDocuments/news.model';

export interface IPhoto {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
    sourceId?: number;
    albumId?: number;
    photoCorrectionId?: number;
    transportPhotoCorrectionId?: number;
    news?: INews[];
}

export class Photo implements IPhoto {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public name?: string,
        public description?: string,
        public sourceId?: number,
        public albumId?: number,
        public photoCorrectionId?: number,
        public transportPhotoCorrectionId?: number,
        public news?: INews[]
    ) {}
}
