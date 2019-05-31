import { IFormProjectionField } from './form-projection-field.model';

export interface IadFormProjectionInterface {
    code: string;
    title: string;
    fields: IFormProjectionField[];
    label?: string; // @deprecated in favor of title
    className?: string;
    properties?: any;
}

export class IadFormProjection implements IadFormProjectionInterface {
    code: string;
    title: string;
    fields: IFormProjectionField[];
    label?: string; // @deprecated in favor of title
    className?: string;
    properties?: any;
}
