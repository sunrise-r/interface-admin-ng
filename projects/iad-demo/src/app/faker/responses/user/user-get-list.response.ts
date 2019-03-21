import {Observable, of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {AbstractResponse} from '../abstract.response';
import {users} from '../../users';

export const userGetListConditionCallback = (request) => request.url.endsWith('/users') && request.method === 'GET';

export class UserGetListResponse extends AbstractResponse {
  getResponse(): Observable<any> {
    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
    if (this.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
      return of(new HttpResponse({ status: 200, body: users }));
    }
    // return 401 not authorised if token is null or invalid
    return throwError({ error: { message: 'Unauthorised' } });
  }

}
