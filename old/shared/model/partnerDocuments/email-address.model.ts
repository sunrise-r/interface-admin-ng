export interface IEmailAddress {
    id?: number;
    code?: string;
    label?: string;
}

export class EmailAddress implements IEmailAddress {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
