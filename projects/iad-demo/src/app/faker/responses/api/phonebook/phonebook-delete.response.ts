import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../abstract.response';

export const phonebookDeleteConditionCallback = (request) => request.url.match(/\/api\/phonebook\/delete\/\d+$$/) && request.method === 'DELETE';

export class PhonebookDeleteResponse extends AbstractResponse {
    getResponse(): Observable<HttpResponse<string>> {
        console.log('Deleting record with request to ' + this.request.url);
        return of(new HttpResponse({ status: 200, body: '' }));
    }
}
