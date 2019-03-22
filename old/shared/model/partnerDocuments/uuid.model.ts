export interface IUUID {
    id?: number;
    code?: string;
    label?: string;
}

export class UUID implements IUUID {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
