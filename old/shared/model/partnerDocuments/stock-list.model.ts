import { INomenclature } from 'app/shared/model/partnerDocuments/nomenclature.model';

export interface IStockList {
    id?: number;
    price?: number;
    unitsId?: number;
    taxId?: number;
    nomenclatures?: INomenclature[];
}

export class StockList implements IStockList {
    constructor(
        public id?: number,
        public price?: number,
        public unitsId?: number,
        public taxId?: number,
        public nomenclatures?: INomenclature[]
    ) {}
}
