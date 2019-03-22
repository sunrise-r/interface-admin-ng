import { Moment } from 'moment';

export interface ITransferRequest {
    id?: number;
    creationDate?: Moment;
    number?: number;
    customerId?: number;
    contractId?: number;
    cargoLotId?: number;
    lotForTransportId?: number;
}

export class TransferRequest implements ITransferRequest {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
        public customerId?: number,
        public contractId?: number,
        public cargoLotId?: number,
        public lotForTransportId?: number
    ) {}
}
