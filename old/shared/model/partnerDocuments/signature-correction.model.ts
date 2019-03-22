export interface ISignatureCorrection {
    id?: number;
    employeeId?: number;
    termId?: number;
}

export class SignatureCorrection implements ISignatureCorrection {
    constructor(public id?: number, public employeeId?: number, public termId?: number) {}
}
