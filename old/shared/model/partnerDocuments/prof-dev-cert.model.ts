export interface IProfDevCert {
    id?: number;
    faculty?: string;
    specialization?: string;
    employeeId?: number;
    documentGroupId?: number;
}

export class ProfDevCert implements IProfDevCert {
    constructor(
        public id?: number,
        public faculty?: string,
        public specialization?: string,
        public employeeId?: number,
        public documentGroupId?: number
    ) {}
}
