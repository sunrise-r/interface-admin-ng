import {Observable, of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../abstract.response';

export const dropdownValuesConditionCallback = (request) => {
  return request.url.match(/partnerdocuments\/api\/dropdown-values/) && request.method === 'GET';
};

export class DropdownValuesResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<{label: string, value: string}[]>> {
    const data = ['Six', 'Seven', 'Eight', 'Nine', 'Ten'].reduce((acu, str) => acu.concat([{label: str, value: str}]), []);
    return of(new HttpResponse({status: 200, body: data}));
  }
}
