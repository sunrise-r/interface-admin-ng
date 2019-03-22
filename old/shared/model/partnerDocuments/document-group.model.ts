export interface IDocumentGroup {
    id?: number;
    name?: string;
    description?: string;
    groupTypeId?: number;
}

export class DocumentGroup implements IDocumentGroup {
    constructor(public id?: number, public name?: string, public description?: string, public groupTypeId?: number) {}
}
