import { IFormProjectionField } from './form-projection-field.model';

export interface IadFormProjectionInterface {
    /**
     * Projection identifier
     */
    code: string;

    /**
     * Projection human readable title
     */
    title: string;

    /**
     * Form inputs configuration
     */
    fields: IFormProjectionField[];

    /**
     * Type of the form. Helper property to identify and filter forms
     */
    formType?: string,

    /**
     * Action, where to send form after submit.
     * Note, that form submission is not implemented in Iad
     */
    actionUrl?: string,

    /**
     * Projection human readable title
     * @deprecated in favor of title
     */
    label?: string;

    /**
     * Current entity className
     * Helper property to identify entity, edited or created using current form
     */
    className?: string;

    /**
     * key->value properties with additional information for your own needs
     */
    properties?: any;
}

export class IadFormProjection implements IadFormProjectionInterface {
    code: string;
    title: string;
    fields: IFormProjectionField[];
    actionUrl?: string;
    formType?: string;
    label?: string; // @deprecated in favor of title
    className?: string;
    properties?: any;
}
