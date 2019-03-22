export interface ITax {
    id?: number;
    code?: string;
    label?: string;
}

export class Tax implements ITax {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
