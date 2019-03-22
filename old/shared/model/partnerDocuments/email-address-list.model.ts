export interface IEmailAddressList {
    id?: number;
    mainEmailAddress?: string;
    additionalEmailAddress?: string;
}

export class EmailAddressList implements IEmailAddressList {
    constructor(public id?: number, public mainEmailAddress?: string, public additionalEmailAddress?: string) {}
}
