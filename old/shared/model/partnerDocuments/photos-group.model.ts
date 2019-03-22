import { Moment } from 'moment';

export interface IPhotosGroup {
    id?: number;
    creationDate?: Moment;
    name?: string;
    description?: string;
}

export class PhotosGroup implements IPhotosGroup {
    constructor(public id?: number, public creationDate?: Moment, public name?: string, public description?: string) {}
}
