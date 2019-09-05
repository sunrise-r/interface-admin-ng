import { ToolbarAction } from '../../toolbar/toolbar-action.model';
import { IadGridColumn } from '../../iad-base-grid/model/iad-grid-column.model';

export interface FilterInterface {
    field: string;
    values: string[];
    statementType: any;
    operator?: any;
}

export interface IadListProjectionInterface {
    actions: ToolbarAction[][];
    label: string;
    code: string;
    active?: boolean;
    searchUrl?: string;
    columns?: IadGridColumn[];
    filters?: FilterInterface[];
    properties?: any;
    loadActualInfo?: boolean;
    settingsGroupName?: string; // Not used yet
    resourceSearchUrl?: string; // Not used yet
}

export class DocumentListProjection implements IadListProjectionInterface {
    actions: ToolbarAction[][];
    label: string;
    code: string;
    active?: boolean;
    searchUrl?: string;
    infoUrl?: string;
    columns?: IadGridColumn[];
    filters?: FilterInterface[];
    properties?: any;
    loadActualInfo?: boolean;
    settingsGroupName?: string; // Not used yet
    resourceSearchUrl?: string; // Not used yet. What the difference with searchUrl ?
}
