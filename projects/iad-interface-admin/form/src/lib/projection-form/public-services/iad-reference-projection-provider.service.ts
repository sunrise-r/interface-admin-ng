import {Observable} from 'rxjs';
import {IadFormProjectionInterface} from '../model/iad-form-projection.model';

export interface IadReferenceProjectionProviderService {
  findProjectionsByName(input: { [param: string]: string | string[] }): Observable<{ [param: string]: IadFormProjectionInterface }>;
}
