export interface IIndividuals {
    id?: number;
    surname?: string;
    name?: string;
    patronimic?: string;
    address?: string;
    inn?: string;
    snils?: string;
}

export class Individuals implements IIndividuals {
    constructor(
        public id?: number,
        public surname?: string,
        public name?: string,
        public patronimic?: string,
        public address?: string,
        public inn?: string,
        public snils?: string
    ) {}
}
