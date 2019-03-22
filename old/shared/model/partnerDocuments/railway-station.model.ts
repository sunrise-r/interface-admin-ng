export interface IRailwayStation {
    id?: number;
    code?: string;
    name?: string;
    region?: string;
    road?: string;
}

export class RailwayStation implements IRailwayStation {
    constructor(public id?: number, public code?: string, public name?: string, public region?: string, public road?: string) {}
}
