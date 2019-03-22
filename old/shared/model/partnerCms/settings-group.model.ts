export interface ISettingsGroup {
    id?: number;
    name?: string;
}

export class SettingsGroup implements ISettingsGroup {
    constructor(public id?: number, public name?: string) {}
}
