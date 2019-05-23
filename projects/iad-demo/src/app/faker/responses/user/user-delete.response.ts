import {Observable, of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {AbstractResponse} from '../abstract.response';
import {users} from '../../users';

export const userDeleteConditionCallback = (request) => request.url.match(/\/users\/\d+$/) && request.method === 'DELETE';

export class UserDeleteResponse extends AbstractResponse {
  getResponse(): Observable<any> {
    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
    if (this.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
      // find user by id in users array
      const urlParts = this.request.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 1], 10);
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.id === id) {
          // delete user
          users.splice(i, 1);
          localStorage.setItem('users', JSON.stringify(users));
          break;
        }
      }

      // respond 200 OK
      return of(new HttpResponse({ status: 200 }));
    }
    // return 401 not authorised if token is null or invalid
    return throwError({ error: { message: 'Unauthorised' } });
  }

}
