export interface IDocumentAttachment {
    id?: number;
    documentId?: number;
    documentClass?: string;
}

export class DocumentAttachment implements IDocumentAttachment {
    constructor(public id?: number, public documentId?: number, public documentClass?: string) {}
}
