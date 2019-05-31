import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IadFormProjectionInterface } from '../model/iad-form-projection.model';
import { IadReferenceProjectionProviderInterface } from '../iad-reference-projection-provider.interface';

@Injectable({
    providedIn: 'root'
})
export class IadReferenceProjectionProviderService implements IadReferenceProjectionProviderInterface {
    findProjectionsByName(input: { [p: string]: string | string[] }): Observable<{ [p: string]: IadFormProjectionInterface }> {
        console.error('IadReferenceProjectionProviderService is not implemented!');
        return undefined;
    }
}
