import {users} from '../users';
import {AbstractResponse} from './abstract.response';
import {Observable, of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export const authConditionCallback = (request) => request.url.endsWith('/users/authenticate') && request.method === 'POST';

export class AuthResponse extends AbstractResponse {
  getResponse(): Observable<any> {
    // find if any user matches login credentials
    const filteredUsers = users.filter(user => {
      return user.username === this.request.body.username && user.password === this.request.body.password;
    });

    if (filteredUsers.length) {
      // if login details are valid return 200 OK with user details and fake jwt token
      const user = filteredUsers[0];
      const body = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      };

      return of(new HttpResponse({ status: 200, body: body }));
    }
    // else return 400 bad request
    return throwError({ error: { message: 'Username or password is incorrect' } });
  }
}




