import {Operator, statementTypes} from '../../elastic';
import {ToolbarAction} from '../../toolbar';
import {IadGridColumn} from './iad-grid-column.model';

export interface FilterInterface {
  field: string;
  values: string[];
  statementType: statementTypes;
  operator?: Operator;
}

export interface IadListProjectionInterrface {
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

export class DocumentListProjection implements IadListProjectionInterrface {
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
  resourceSearchUrl?: string; // Not used yet. What the difference with searchUrl ?
}
