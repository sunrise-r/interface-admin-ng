import { Moment } from 'moment';
import { IOrganizationDepartment } from 'app/shared/model/partnerDocuments/organization-department.model';
import { IBranch } from 'app/shared/model/partnerDocuments/branch.model';

export interface IEmployee {
    id?: number;
    creationDate?: Moment;
    firstName?: string;
    secondName?: string;
    patronymic?: string;
    fullName?: string;
    birthday?: Moment;
    sex?: string;
    post?: string;
    personInsuranceAccount?: string;
    gUID?: string; // @deprecated?
    guid?: string;
    buisnessCardId?: number;
    transportUnitsId?: number;
    decreeId?: number;
    organizationCorrespondenceId?: number;
    directiveId?: number;
    writId?: number;
    solutionId?: number;
    additionalDocuments?: any[];
    archive?: boolean;
    number?: string;
    status?: string;
    photo?: string;
    departments?: IOrganizationDepartment[];
    branches?: IBranch[];
    company?: string;
}

export class Employee implements IEmployee {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public firstName?: string,
        public secondName?: string,
        public patronymic?: string,
        public fullName?: string,
        public birthday?: Moment,
        public sex?: string,
        public post?: string,
        public personInsuranceAccount?: string,
        public gUID?: string, // @deprecated?
        public guid?: string,
        public buisnessCardId?: number,
        public transportUnitsId?: number,
        public decreeId?: number,
        public organizationCorrespondenceId?: number,
        public directiveId?: number,
        public writId?: number,
        public solutionId?: number,
        public additionalDocuments?: any[],
        public archive?: boolean,
        public number?: string,
        public status?: string,
        public photo?: string,
        public departments?: IOrganizationDepartment[],
        public branches?: IBranch[],
        public company?: string
    ) {}
}
