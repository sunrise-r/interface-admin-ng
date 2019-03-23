import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../../abstract.response';
import {IadPresentation, IadProjectionInterface} from 'iad-interface-admin';

export const presentationConditionCallback = (request) => request.url.match(/\/partnercms\/api\/iad\/presentation\/[a-zA-Z0-9]+$/) && request.method === 'GET';

export class PresentationResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<IadPresentation>> {
    const data = new IadPresentation();
    return of(new HttpResponse({ status: 200, body: data }));
  }
}
