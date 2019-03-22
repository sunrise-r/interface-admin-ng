import { Moment } from 'moment';

export interface IBranchDepartment {
    id?: number;
    name?: string;
    creationDate?: Moment;
    description?: string;
    branchId?: number;
}

export class BranchDepartment implements IBranchDepartment {
    constructor(
        public id?: number,
        public name?: string,
        public creationDate?: Moment,
        public description?: string,
        public branchId?: number
    ) {}
}
