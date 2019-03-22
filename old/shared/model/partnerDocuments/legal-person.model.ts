export interface ILegalPerson {
    id?: number;
    name?: string;
    address?: string;
    ogrn?: string;
    inn?: string;
    kpp?: string;
    chief?: string;
}

export class LegalPerson implements ILegalPerson {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public ogrn?: string,
        public inn?: string,
        public kpp?: string,
        public chief?: string
    ) {}
}
