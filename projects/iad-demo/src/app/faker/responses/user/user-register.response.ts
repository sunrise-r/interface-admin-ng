import {Observable, of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {AbstractResponse} from '../abstract.response';
import {users} from '../../users';

export const userRegisterConditionCallback = (request) => request.url.endsWith('/users/register') && request.method === 'POST';

export class UserRegisterResponse extends AbstractResponse {
  getResponse(): Observable<any> {
    // get new user object from post body
    const newUser = this.request.body;

    // validation
    const duplicateUser = users.filter(user => user.username === newUser.username).length;
    if (duplicateUser) {
      return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
    }

    // save new user
    newUser.id = users.length + 1;
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // respond 200 OK
    return of(new HttpResponse({ status: 200 }));
  }

}
