import {Injectable, Type} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {IFakeResponse} from './responses/abstract.response';
import {authConditionCallback, AuthResponse} from './responses/auth.response';
import {userGetListConditionCallback, UserGetListResponse} from './responses/user/user-get-list.response';
import {userGetByIdConditionCallback, UserGetByIdResponse} from './responses/user/user-get-by-id.response';
import {userRegisterConditionCallback, UserRegisterResponse} from './responses/user/user-register.response';
import {userDeleteConditionCallback, UserDeleteResponse} from './responses/user/user-delete.response';
import {projectionTreeConditionCallback, ProjectionTreeResponse} from './responses/projection-tree.response';
import {presentationConditionCallback, PresentationResponse} from './responses/cms/api/iad/presentation.response';
import {phonebookConditionCallback, PhonebookResponse} from './responses/documents/api/_search/phonebook.response';
import {projectionReferenceConditionCallback, ProjectionReferenceResponse} from './responses/cms/api/iad/projection-reference.response';

class FakerRegistry {
  constructor(
    public faker: Type<IFakeResponse>,
    public condition: (request: HttpRequest<any>) => boolean
  ) {}

  getFaker(request): IFakeResponse {
    return new this.faker(request);
  }
}

const registry = [
    new FakerRegistry(AuthResponse, authConditionCallback),
    new FakerRegistry(UserGetListResponse, userGetListConditionCallback),
    new FakerRegistry(UserGetByIdResponse, userGetByIdConditionCallback),
    new FakerRegistry(UserRegisterResponse, userRegisterConditionCallback),
    new FakerRegistry(UserDeleteResponse, userDeleteConditionCallback),
    new FakerRegistry(ProjectionTreeResponse, projectionTreeConditionCallback),
    new FakerRegistry(PresentationResponse, presentationConditionCallback),
    new FakerRegistry(PhonebookResponse, phonebookConditionCallback),
    new FakerRegistry(ProjectionReferenceResponse, projectionReferenceConditionCallback)
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      const fakerRegistry = registry.find(fR => fR.condition(request));
      if (fakerRegistry) {
        return <Observable<HttpEvent<any>>>(fakerRegistry.getFaker(request).getResponse());
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
