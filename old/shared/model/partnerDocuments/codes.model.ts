export interface ICodes {
    id?: number;
    codeEan13?: string;
    codeOkpId?: number;
    codeTnVedId?: number;
    codeEtshgId?: number;
}

export class Codes implements ICodes {
    constructor(
        public id?: number,
        public codeEan13?: string,
        public codeOkpId?: number,
        public codeTnVedId?: number,
        public codeEtshgId?: number
    ) {}
}
