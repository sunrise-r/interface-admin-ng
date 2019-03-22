import {IadProjectionInterface} from './iad-interfaces';

/**
 * @todo look at his later and resolve if formPresentation and Datapresentation are correctly placed here
 */
export class IadPresentation {
  code: string;
  label?: string;
  name?: string;
  projections?: Array<IadProjectionInterface>;
  formProjections?: Array<IadProjectionInterface>;
  dataProjections?: Array<IadProjectionInterface>;
}
