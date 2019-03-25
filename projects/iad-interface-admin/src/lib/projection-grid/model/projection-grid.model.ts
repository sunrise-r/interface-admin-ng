import {Operator} from '../../elastic/models/operator.model';
import {statementTypes} from '../../elastic/operations/statement.factory';
import {ToolbarAction} from '../../toolbar/models/toolbar-action.model';
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
