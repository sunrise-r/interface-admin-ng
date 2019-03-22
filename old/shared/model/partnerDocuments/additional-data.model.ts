export interface IAdditionalData {
    id?: number;
    numberOnDownlaod?: number;
    numberOfUnloading?: number;
    additionalInfo?: string;
    documentTypeId?: number;
}

export class AdditionalData implements IAdditionalData {
    constructor(
        public id?: number,
        public numberOnDownlaod?: number,
        public numberOfUnloading?: number,
        public additionalInfo?: string,
        public documentTypeId?: number
    ) {}
}
