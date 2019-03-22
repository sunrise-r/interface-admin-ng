export interface IadProjectionInterface {
  code: string;
  label: string;
  properties?: {[prop: string]: string};
}

/**
 * @todo look at his later and resolve if formPresentation and Datapresentation are correctly placed here
 */
export interface IadPresentationInterface {
  code: string;
  label?: string;
  name?: string;
  projections?: Array<IadProjectionInterface>;
  formProjections?: Array<IadProjectionInterface>;
  dataProjections?: Array<IadProjectionInterface>;
}
