export interface INatureOfGoods {
    id?: number;
    name?: string;
    weight?: number;
    volume?: number;
    transportPackagingId?: number;
}

export class NatureOfGoods implements INatureOfGoods {
    constructor(
        public id?: number,
        public name?: string,
        public weight?: number,
        public volume?: number,
        public transportPackagingId?: number
    ) {}
}
