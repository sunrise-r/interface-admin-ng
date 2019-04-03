import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../../abstract.response';
import {IadFormProjection} from 'iad-interface-admin';

export const projectionReferenceConditionCallback = (request) => {
  return request.url.match(/partnercms\/api\/iad\/form-projection\/[a-zA-Z0-9]+$/) && request.method === 'GET';
};

// IadProjectionInterface

export class ProjectionReferenceResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<{[param: string]: IadFormProjection}>> {
    const projection = new IadFormProjection();
    projection.code = 'additionalFields';
    projection.title = 'Ссылка';
    projection.fields = [
      {
        'validationTypes': {'maxLength': '20', 'email': false, 'required': false},
        'type': 'String',
        'name': 'firstField',
        'label': 'Первое поле',
        'column': 0,
        'hidden': false,
      },
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'String',
        'name': 'secondField',
        'label': 'Второе поле',
        'column': 0,
        'hidden': false,
        'inputMask': '99999999'
      },
    ];
    projection.properties = [];
    const response = {'presentationOne.additionalFields': projection};
    return of(new HttpResponse({status: 200, body: response}));
  }
}
