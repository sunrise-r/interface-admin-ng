import {Observable} from 'rxjs';
import {IadFormProjectionInterface} from '../projection-form/model/projection-form.model';

export interface IadReferenceProjectionProviderService {
  findProjectionsByName(input: { [param: string]: string | string[] }): Observable<{ [param: string]: IadFormProjectionInterface }>;
}
