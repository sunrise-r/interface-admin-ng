export interface IRailwayRequisites {
    id?: number;
    organizationCode?: string;
    stationId?: number;
}

export class RailwayRequisites implements IRailwayRequisites {
    constructor(public id?: number, public organizationCode?: string, public stationId?: number) {}
}
