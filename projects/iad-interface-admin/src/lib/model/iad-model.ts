import {IadProjectionInterface} from './iad-interfaces';
import {IadFormProjectionInterface} from '../projection-form/model/projection-form.model';
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
