export interface IAddress {
    id?: number;
    index?: string;
    country?: string;
    region?: string;
    area?: string;
    inhabitedLocality?: string;
    street?: string;
    houseNumber?: string;
    flatNumber?: string;
}

export class Address implements IAddress {
    constructor(
        public id?: number,
        public index?: string,
        public country?: string,
        public region?: string,
        public area?: string,
        public inhabitedLocality?: string,
        public street?: string,
        public houseNumber?: string,
        public flatNumber?: string
    ) {}
}
