import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../../abstract.response';

export const phonebookConditionCallback = (request) => {
  return request.url.match(/partnerdocuments\/api\/_search\/phonebook$/) && request.method === 'GET';
};

export class PhoneBook {
  constructor(
    public id: number,
    public nameField: string,
    public surnameField: string,
    public birthDate: string,
    public phone: string,
    public email: string
  ) {}
}

// IadProjectionInterface
export class PhonebookResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<PhoneBook[]>> {
    const data = [
      new PhoneBook(0, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(1, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(2, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(3, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(4, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(5, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(6, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(7, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(8, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(9, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(10, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(11, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(12, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(13, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(14, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(15, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(16, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(17, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(18, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(19, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(20, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(21, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(22, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(23, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(24, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(25, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(26, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(27, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com'),
      new PhoneBook(28, 'Иванов', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com')
    ];
    return of(new HttpResponse({status: 200, body: data}));
  }
}





