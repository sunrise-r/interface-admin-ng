export interface IMediaResource {
    id?: number;
    code?: string;
    label?: string;
}

export class MediaResource implements IMediaResource {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
