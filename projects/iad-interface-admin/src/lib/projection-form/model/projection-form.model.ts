import {IFormProjectionField} from './form-projection-field.model';

export interface IadFormProjectionInterface {
  code: string;
  title: string;
  fields: IFormProjectionField[];
  className?: string; // is not necessary to have compatibility with old-style projections where classname was only in properties
  properties?: any;
}

export class IadFormProjection implements IadFormProjectionInterface {
  code: string;
  title: string;
  fields: IFormProjectionField[];
  className?: string;
  properties?: any;
}
