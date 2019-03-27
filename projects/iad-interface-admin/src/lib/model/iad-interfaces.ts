import {IadListProjectionInterrface} from '../projection-grid/model/projection-grid.model';
import {IadFormProjectionInterface} from '../projection-form/model/projection-form.model';

export interface IadProjectionInterface {
  code: string;
  properties?: {[prop: string]: string};
}

/**
 * @todo look at his later and resolve if formPresentation and Datapresentation are correctly placed here
 */
export interface IadPresentationInterface {
  code: string;
  label?: string;
  name?: string;
  projections?: IadListProjectionInterrface[];
  formProjections?: IadFormProjectionInterface[];
  dataProjections?: IadProjectionInterface[];
}