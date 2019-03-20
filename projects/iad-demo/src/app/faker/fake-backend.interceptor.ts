import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {AbstractResponse} from './responses/abstract.response';
import {AuthResponse} from './responses/auth.response';
import {UserGetListResponse} from './responses/user-get-list.response';
import {UserGetByIdResponse} from './responses/user-get-by-id.response';
import {UserRegisterResponse} from './responses/user-register.response';
import {UserDeleteResponse} from './responses/user-delete.response';

class FakeRequest {
  constructor(
    public faker: AbstractResponse,
    public condition: () => boolean
  ) {}
}

const fakerFactory = function(request){
  return [
    new FakeRequest(new AuthResponse(request), () => request.url.endsWith('/users/authenticate') && request.method === 'POST'),
    new FakeRequest(new UserGetListResponse(request), () => request.url.endsWith('/users') && request.method === 'GET'),
    new FakeRequest(new UserGetByIdResponse(request), () => request.url.match(/\/users\/\d+$/) && request.method === 'GET'),
    new FakeRequest(new UserRegisterResponse(request), () => request.url.endsWith('/users/register') && request.method === 'POST'),
    new FakeRequest(new UserDeleteResponse(request), () => request.url.match(/\/users\/\d+$/) && request.method === 'DELETE')
  ];
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      const fakerRequest = fakerFactory(request).find(fR => fR.condition());
      if (fakerRequest) {
        return fakerRequest.faker.get();
      }
      // pass through any requests not handled above
      return next.handle(request);
    }))

  // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
