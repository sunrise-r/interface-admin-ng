export interface IAxleConfiguration {
    id?: number;
    code?: string;
    label?: string;
}

export class AxleConfiguration implements IAxleConfiguration {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
