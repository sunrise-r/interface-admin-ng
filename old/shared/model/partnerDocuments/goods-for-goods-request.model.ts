export interface IGoodsForGoodsRequest {
    id?: number;
    number?: number;
    documentGroupId?: number;
    goodsId?: number;
}

export class GoodsForGoodsRequest implements IGoodsForGoodsRequest {
    constructor(public id?: number, public number?: number, public documentGroupId?: number, public goodsId?: number) {}
}
