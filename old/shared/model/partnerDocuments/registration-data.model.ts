export interface IRegistrationData {
    id?: number;
    ogrn?: string;
    inn?: string;
    kpp?: string;
}

export class RegistrationData implements IRegistrationData {
    constructor(public id?: number, public ogrn?: string, public inn?: string, public kpp?: string) {}
}
