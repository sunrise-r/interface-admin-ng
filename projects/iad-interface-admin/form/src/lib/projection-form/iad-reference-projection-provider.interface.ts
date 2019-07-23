import { Observable } from 'rxjs';
import { IadFormProjectionInterface } from './model/iad-form-projection.model';

export interface IadReferenceProjectionProviderInterface {

    /**
     * Will allow to get form projection map from API
     * @param input
     */
    findFormProjectionsByName?: (input: { [param: string]: string | string[] }) => Observable<{ [param: string]: IadFormProjectionInterface }>;
}
