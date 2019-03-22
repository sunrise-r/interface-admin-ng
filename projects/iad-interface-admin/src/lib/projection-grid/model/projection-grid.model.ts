import {IadProjectionInterface} from '../../model/iad-interfaces';
import {Operator, statementTypes} from '../../elastic';
import {ToolbarAction} from '../../toolbar';
import {IadGridColumn} from './iad-grid-column.model';

export interface FilterInterface {
  field: string;
  values: string[];
  statementType: statementTypes;
  operator?: Operator;
}

export class DocumentListProjection implements IadProjectionInterface {
  actions: ToolbarAction[][];
  label: string;
  code: string;
  active?: boolean;
  searchUrl?: string;
  columns?: IadGridColumn[];
  filters?: FilterInterface[];
  settingsGroupName?: string; // Is it used anywhere?
  resourceSearchUrl?: string; // Is it used anywhere?
  properties?: any;
  loadActualInfo?: boolean;
}
