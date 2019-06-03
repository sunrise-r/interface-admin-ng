import { IadListProjectionInterface } from '../projection-grid/model/projection-grid.model';
import { IadFormProjectionInterface } from 'iad-interface-admin/form';

export interface IadProjectionInterface {
    code: string;
    active?: boolean;
    label?: string;
    properties?: { [prop: string]: string };
}

/**
 * @todo look at his later and resolve if formPresentation and Datapresentation are correctly placed here
 */
export interface IadPresentationInterface {
    code: string;
    label?: string;
    name?: string;
    projections?: IadListProjectionInterface[];
    formProjections?: IadFormProjectionInterface[];
    dataProjections?: IadProjectionInterface[];
}
