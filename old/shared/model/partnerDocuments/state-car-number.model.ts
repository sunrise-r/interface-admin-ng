export interface IStateCarNumber {
    id?: number;
    carNumber?: string;
    regionCode?: string;
    countryCode?: string;
}

export class StateCarNumber implements IStateCarNumber {
    constructor(public id?: number, public carNumber?: string, public regionCode?: string, public countryCode?: string) {}
}
