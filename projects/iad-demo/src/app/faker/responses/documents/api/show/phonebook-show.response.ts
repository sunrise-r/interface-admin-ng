import {Observable, of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../../abstract.response';
import {PhoneBook} from '../../model/phonebook.model';

export const phonebookShowConditionCallback = (request) => {
  return request.url.match(/partnerdocuments\/api\/phonebook\/\d+$/) && request.method === 'GET';
};

// IadProjectionInterface
export class PhonebookShowResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<any>> {
    const segments = this.request.url.split('/');
    const id = parseInt(segments[segments.length - 1], 10);
    let data;
    if (id === 42) {
      data = new PhoneBook(42, 'Иванов42', undefined, '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com',
        ['One', 'Three'], '12345', false, 'Four', 'Seven','<p><strong>Strong</strong> <i>Italic</i></p>', ['chipOne', 'chipTwo']);
    }
    return of(new HttpResponse({status: 200, body: data}));
  }
}
