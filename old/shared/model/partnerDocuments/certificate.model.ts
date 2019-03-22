import { Moment } from 'moment';

export interface ICertificate {
    id?: number;
    seriesNumber?: string;
    firstName?: string;
    surname?: string;
    patronimic?: string;
    postiton?: string;
    organization?: string;
    inn?: string;
    ogrn?: string;
    publisher?: string;
    actualWith?: Moment;
    actualOn?: Moment;
}

export class Certificate implements ICertificate {
    constructor(
        public id?: number,
        public seriesNumber?: string,
        public firstName?: string,
        public surname?: string,
        public patronimic?: string,
        public postiton?: string,
        public organization?: string,
        public inn?: string,
        public ogrn?: string,
        public publisher?: string,
        public actualWith?: Moment,
        public actualOn?: Moment
    ) {}
}
