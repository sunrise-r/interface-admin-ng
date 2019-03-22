export interface INomDocsPackageCorrection {
    id?: number;
}

export class NomDocsPackageCorrection implements INomDocsPackageCorrection {
    constructor(public id?: number) {}
}
