import {Observable, of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../../abstract.response';
import {PhoneBook} from '../../model/phonebook.model';

export const phonebookShowConditionCallback = (request) => {
  return request.url.match(/partnerdocuments\/api\/phonebook\/42$/) && request.method === 'GET';
};

// IadProjectionInterface
export class PhonebookShowResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<PhoneBook>> {
    const data = new PhoneBook(42, 'Иванов42', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com',
      'Первое поле', '12345');
    return of(new HttpResponse({status: 200, body: data}));
  }
}





