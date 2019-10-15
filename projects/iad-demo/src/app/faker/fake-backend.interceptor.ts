import { Injectable, Type } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { IFakeResponse } from './responses/abstract.response';
import { authConditionCallback, AuthResponse } from './responses/auth.response';
import { userGetListConditionCallback, UserGetListResponse } from './responses/user/user-get-list.response';
import { userGetByIdConditionCallback, UserGetByIdResponse } from './responses/user/user-get-by-id.response';
import { userRegisterConditionCallback, UserRegisterResponse } from './responses/user/user-register.response';
import { userDeleteConditionCallback, UserDeleteResponse } from './responses/user/user-delete.response';
import { projectionTreeConditionCallback, ProjectionTreeResponse } from './responses/iad/projection-tree.response';
import { presentationConditionCallback, PresentationResponse } from './responses/iad/presentation.response';
import { projectionReferenceConditionCallback, ProjectionReferenceResponse } from './responses/iad/projection-reference.response';
import {
    projectionSubReferenceConditionCallback,
    ProjectionSubReferenceResponse
} from './responses/iad/projection-sub-reference.response';
import { dropdownValuesConditionCallback, DropdownValuesResponse } from './responses/api/dropdown-values';
import { autoCompleteValuesConditionCallback, AutoCompleteValuesResponse } from './responses/api/auto-complete-values';
import { phonebookConditionCallback, PhonebookSearchResponse } from './responses/api/phonebook/phonebook-search.response';
import { phonebookShowConditionCallback, PhonebookShowResponse } from './responses/api/phonebook/phonebook-show.response';
import { phonebookAddConditionCallback, PhonebookEditResponse } from './responses/api/phonebook/phonebook-edit.response';
import { phonebookDeleteConditionCallback, PhonebookDeleteResponse } from './responses/api/phonebook/phonebook-delete.response';

class FakerRegistry {
    fakerInstance: IFakeResponse;

    constructor(
        public faker: Type<IFakeResponse>,
        public condition: (request: HttpRequest<any>) => boolean
    ) {}

    getFaker(request): IFakeResponse {
        if (!this.fakerInstance) {
            this.fakerInstance = (new this.faker());
        }
        return this.fakerInstance.setRequest(request);
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
    new FakerRegistry(PhonebookSearchResponse, phonebookConditionCallback),
    new FakerRegistry(PhonebookShowResponse, phonebookShowConditionCallback),
    new FakerRegistry(ProjectionReferenceResponse, projectionReferenceConditionCallback),
    new FakerRegistry(DropdownValuesResponse, dropdownValuesConditionCallback),
    new FakerRegistry(PhonebookEditResponse, phonebookAddConditionCallback),
    new FakerRegistry(PhonebookDeleteResponse, phonebookDeleteConditionCallback),
    new FakerRegistry(AutoCompleteValuesResponse, autoCompleteValuesConditionCallback),
    new FakerRegistry(ProjectionSubReferenceResponse, projectionSubReferenceConditionCallback)
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            const fakerRegistry = registry.find(fR => fR.condition(request));
            if (fakerRegistry) {
                console.log('Intercepting URL: ' + request.url);
                const response = fakerRegistry.getFaker(request).getResponse();
                return <Observable<HttpEvent<any>>>(response);
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
