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
        'type': 'MultiSelect',
        'name': 'firstField',
        'label': 'presentation.projection.main.firstField',
        'column': 0,
        'hidden': false,
        'visible': true,
        'translate': true,
        'properties': {
          'values': [
            'One', 'Two', 'Three', 'Four', 'Five'
          ],
          'maxSelectedLabels': 5,
          'filter': false
        }
      },
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'String',
        'name': 'secondField',
        'label': 'presentation.projection.main.secondField',
        'column': 0,
        'hidden': false,
        'visible': true,
        'translate': true,
        'inputMask': '99999999'
      },
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'Boolean',
        'name': 'booleanField',
        'label': 'presentation.projection.main.booleanField',
        'column': 0,
        'hidden': false,
        'visible': true,
        'translate': true
      },
    ];
    projection.properties = [];
    const response = {'presentationOne.additionalFields': projection};
    return of(new HttpResponse({status: 200, body: response}));
  }
}
