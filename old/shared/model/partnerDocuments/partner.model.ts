export interface IPartner {
    id?: number;
    reasonId?: number;
}

export class Partner implements IPartner {
    constructor(public id?: number, public reasonId?: number) {}
}
