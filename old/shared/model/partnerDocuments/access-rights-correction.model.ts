export interface IAccessRightsCorrection {
    id?: number;
    employeeId?: number;
    documentTypeId?: number;
}

export class AccessRightsCorrection implements IAccessRightsCorrection {
    constructor(public id?: number, public employeeId?: number, public documentTypeId?: number) {}
}
