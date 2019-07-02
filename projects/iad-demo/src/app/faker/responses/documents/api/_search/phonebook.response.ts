import {Observable, of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../../abstract.response';
import {PhoneBook} from '../../model/phonebook.model';

export const phonebookConditionCallback = (request) => {
  return request.url.match(/partnerdocuments\/api\/_search\/phonebook$/) && request.method === 'GET';
};

// IadProjectionInterface
export class PhonebookResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<PhoneBook[]>> {
    const data = [
      new PhoneBook(0, 'Иванов0', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(1, 'Иванов1', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(2, 'Иванов2', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(3, 'Иванов3', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(4, 'Иванов4', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(5, 'Иванов5', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(6, 'Иванов6', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(7, 'Иванов7', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(8, 'Иванов8', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(9, 'Иванов9', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(10, 'Иванов10', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(11, 'Иванов11', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(12, 'Иванов12', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(13, 'Иванов14', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(14, 'Иванов14', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(15, 'Иванов15', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(16, 'Иванов16', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(17, 'Иванов17', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(18, 'Иванов18', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(19, 'Иванов19', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(20, 'Иванов20', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(21, 'Иванов21', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(22, 'Иванов22', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(23, 'Иванов23', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(24, 'Иванов24', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(25, 'Иванов25', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(26, 'Иванов26', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(27, 'Иванов27', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(28, 'Иванов28', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(29, 'Иванов29', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(30, 'Иванов30', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(31, 'Иванов31', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(32, 'Иванов32', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(33, 'Иванов33', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(34, 'Иванов34', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(35, 'Иванов35', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(36, 'Иванов36', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(37, 'Иванов37', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(38, 'Иванов38', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(39, 'Иванов39', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(40, 'Иванов40', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(41, 'Иванов41', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(42, 'Иванов42', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com')
    ];

    const size: number = parseInt(this.request.params.get('size'), 10) || 0;
    const page: number = parseInt(this.request.params.get('page'), 10) || 0;
    const offset = size * page;
    const limit = offset + size;
    const currentPageData = data.filter(item => item.id > offset && item.id <= limit);

    const headers = new HttpHeaders({'X-Total-Count': data.length.toString()});
    return of(new HttpResponse({status: 200, body: currentPageData, headers: headers}));
  }
}





