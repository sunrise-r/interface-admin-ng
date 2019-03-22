export interface IPrivacy {
    id?: number;
    code?: string;
    label?: string;
}

export class Privacy implements IPrivacy {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
