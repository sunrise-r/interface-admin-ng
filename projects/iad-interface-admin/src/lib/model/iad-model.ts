import {IadProjectionInterface} from './iad-interfaces';
import {IadFormProjectionInterface} from 'iad-interface-admin/form';
import {IadListProjectionInterrface} from '../projection-grid/model/projection-grid.model';

/**
 * @todo look at his later and resolve if formPresentation and Datapresentation are correctly placed here
 */
export class IadPresentation {
  code: string;
  label?: string;
  name?: string;
  projections?: IadListProjectionInterrface[];
  formProjections?: IadFormProjectionInterface[];
  dataProjections?: IadProjectionInterface[];
}
