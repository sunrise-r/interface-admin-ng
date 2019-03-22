export interface IShotAddr {
    id?: number;
    name?: string;
    country?: string;
    address?: string;
}

export class ShotAddr implements IShotAddr {
    constructor(public id?: number, public name?: string, public country?: string, public address?: string) {}
}
