export interface IDocumentTransfer {
    id?: number;
}

export class DocumentTransfer implements IDocumentTransfer {
    constructor(public id?: number) {}
}
