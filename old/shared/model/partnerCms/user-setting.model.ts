export interface IUserSetting {
    id?: number;
    user?: string;
    key?: string;
    value?: string;
    groupId?: number;
}

export class UserSetting implements IUserSetting {
    constructor(public id?: number, public user?: string, public key?: string, public value?: string, public groupId?: number) {}
}
