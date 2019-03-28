import {Observable, of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

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
      new PhoneBook(28, 'Иванов28', 'Иван', '1998-03-25T07:08:58Z', '(555) 555-55-55', 'ivanov@example.com')
    ];

    const headers = new HttpHeaders({'X-Total-Count': data.length.toString()});
    return of(new HttpResponse({status: 200, body: data, headers: headers}));
  }
}





