import {Observable, of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {AbstractResponse} from '../abstract.response';
import {users} from '../../users';

export const userGetByIdConditionCallback = (request) => request.url.match(/\/users\/\d+$/) && request.method === 'GET';

export class UserGetByIdResponse extends AbstractResponse {
  getResponse(): Observable<any> {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (this.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
      // find user by id in users array
      const urlParts = this.request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1], 10);
      const matchedUsers = users.filter(_user => _user.id === id);
      const user = matchedUsers.length ? matchedUsers[0] : null;

      return of(new HttpResponse({ status: 200, body: user }));
    } else {
      // return 401 not authorised if token is null or invalid
      return throwError({ error: { message: 'Unauthorised' } });
    }
  }

}
