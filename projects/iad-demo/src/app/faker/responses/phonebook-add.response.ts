import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {AbstractResponse} from './abstract.response';

export const phonebookAddConditionCallback = (request) => request.url.match(/\/api\/phonebook\/edit$/) && request.method === 'POST';

export class PhonebookAddResponse extends AbstractResponse {
    getResponse(): Observable<HttpResponse<string>> {
        console.log(this.request.body);
        alert('Look to the browser console to see request body!');
        return of(new HttpResponse({ status: 200, body: '' }));
    }
}
