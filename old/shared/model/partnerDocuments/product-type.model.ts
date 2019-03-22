export interface IProductType {
    id?: number;
    code?: string;
    label?: string;
}

export class ProductType implements IProductType {
    constructor(public id?: number, public code?: string, public label?: string) {}
}
