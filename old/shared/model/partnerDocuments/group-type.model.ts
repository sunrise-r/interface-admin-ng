export interface IGroupType {
    id?: number;
    code?: string;
    label?: string;
}

export class GroupType implements IGroupType {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
