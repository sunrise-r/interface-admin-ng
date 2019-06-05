import { IadFormProjectionInterface } from 'iad-interface-admin/form';
import { IadGridColumn } from 'iad-interface-admin';

export enum DATA_DEPENDENCY_LEVEL {
    DOCUMENT = 'document',
    OPERATION = 'operation',
    REFERENCE = 'reference'
}

export interface IProjectionDefaultFilter {
    field: string;
    values: string[];
    statementType: any;
    operator?: any;
}

export class ProjectionDefaultFilter implements IProjectionDefaultFilter {
    field: string;
    values: string[];
    statementType: any;
    operator: any;

    constructor(field: string, values: string[], statementType?: any, operator?: any) {
        this.field = field;
        this.values = values;
        this.statementType = statementType || 'eq';
        this.operator = operator || 'or';
    }
}

export interface IIADProjection {
    code: string;
    label: string;
    properties?: any;
}

export interface IIADPresentation {
    code: string;
    label?: string;
    name?: string;
    projections?: Array<IIADProjection>;
    formProjections?: Array<IadFormProjectionInterface>;
    dataProjections?: Array<IIADProjection>;
}

export class DocumentDataProjection implements IIADProjection {
    label: string;
    code: string;
    fields: any[];
    documentPhoto?: string;
    properties?: any;
}

export class IadFormField {
    column: number; // 0 or 1
    defaultValue: string;
    fieldInputType: string; // i.e. DISABLED
    hidden: boolean; // hide column in form
    label: string; // translated label
    name: string; // field name attr
    type: string; // formatter
    validationTypes: { [param: string]: string | number | boolean }; // Validators
}

export class IadActualDataField {
    code: string; // code according to specific data
    formatter: string; // formatter
    label: string; // translated label
}

export class IADPresentation implements IIADPresentation {
    code: string;
    label?: string;
    name?: string;
    projections?: Array<DocumentListProjection>;
    formProjections?: Array<IadFormProjectionInterface>;
    dataProjections?: Array<DocumentDataProjection>;
}

export class DocumentListProjection implements IIADProjection {
    actions: any[][]; // TODO it should be ToolbarAction[][], but project does not build correctly if it is (dependency problem)
    label: string;
    code: string;
    active?: boolean;
    searchUrl?: string;
    columns?: IadGridColumn[];
    filters?: IProjectionDefaultFilter[];
    settingsGroupName?: string; // Is it used anywhere?
    resourceSearchUrl?: string; // Is it used anywhere?
    properties?: any;
    loadActualInfo?: boolean;
}

export class Reference {
    className: string;
    indexName: string;
}

export class DocumentMetaInfo {
    className: string;
    referenceFields: Reference[];
}
