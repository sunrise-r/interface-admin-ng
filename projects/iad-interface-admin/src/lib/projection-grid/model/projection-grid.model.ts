import { ToolbarAction } from '../../toolbar/iad-toolbar-action.model';
import { IadGridColumn } from '../../iad-base-grid/model/iad-grid-column.model';

export interface FilterInterface {
    field: string;
    values: string[];
    statementType: any;
    operator?: any;
}

export interface IadListProjectionInterface {
    actions: ToolbarAction[][];
    active?: boolean;
    code: string;
    columns?: IadGridColumn[];
    defaultSortField?: string;
    defaultSortOrder?: string;
    filters?: FilterInterface[];
    infoUrl?: string;
    label: string;
    loadActualInfo?: boolean;
    properties?: any;
    resourceSearchUrl?: string; // Not used yet
    searchUrl?: string;
    settingsGroupName?: string; // Not used yet
}

export class DocumentListProjection implements IadListProjectionInterface {
    actions: ToolbarAction[][];
    active?: boolean;
    code: string;
    columns?: IadGridColumn[];
    defaultSortField?: string;
    defaultSortOrder?: string;
    filters?: FilterInterface[];
    infoUrl?: string;
    label: string;
    loadActualInfo?: boolean;
    properties?: any;
    resourceSearchUrl?: string; // Not used yet. What the difference with searchUrl ?
    searchUrl?: string;
    settingsGroupName?: string; // Not used yet
}
