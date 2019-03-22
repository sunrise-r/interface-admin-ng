export interface ISoleProprietor {
    id?: number;
    name?: string;
    address?: string;
    ogrn?: string;
    inn?: string;
    chief?: string;
}

export class SoleProprietor implements ISoleProprietor {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public ogrn?: string,
        public inn?: string,
        public chief?: string
    ) {}
}
