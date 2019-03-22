import { Moment } from 'moment';

export enum ResolutionType {
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    INFORMED = 'INFORMED',
    REVIEW = 'REVIEW',
    NEW = 'NEW'
}

export interface IResolution {
    creationDate: Moment;
    type: ResolutionType;
    signed: boolean;
    resolver: string;
    post: string;
    organization: string;
    description: string;
    startDate?: Moment;
}

export class Resolution implements IResolution {
    creationDate: Moment;
    type: ResolutionType;
    signed: boolean;
    resolver: string;
    post: string;
    organization: string;
    description: string;
    startDate: Moment;
}
