export interface IDocumentType {
    id?: number;
    code?: string;
    label?: string;
}

export class DocumentType implements IDocumentType {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
