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
        'validationTypes': {'email': false, 'required': false},
        'type': 'Hidden',
        'name': 'hiddenStatus',
        'label': 'Скрытый статус',
        'defaultValue': 'ACTIVE',
        'column': 0,
        'translate': false,
        'properties': {}
      },
      {
        'validationTypes': {'maxLength': '20', 'email': false, 'required': false},
        'type': 'MultiSelect',
        'name': 'firstField',
        'label': 'presentation.projection.main.firstField',
        'column': 0,
        'translate': true,
        'properties': {
          'values': [
            'One', 'Two', 'Three', 'Four', 'Five'
          ],
          'maxSelectedLabels': 5,
          'showHeader': false,
          'translatePrefix': 'phoneBook.firstField.values'
        }
      },
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'String',
        'name': 'secondField',
        'label': 'presentation.projection.main.secondField',
        'column': 0,
        'translate': true,
        'inputMask': '99999999'
      },
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'Boolean',
        'name': 'booleanField',
        'label': 'presentation.projection.main.booleanField',
        'column': 0,
        'translate': true
      },
      {
        'validationTypes': {'email': false, 'required': true},
        'type': 'Dropdown',
        'name': 'dropdownField',
        'label': 'presentation.projection.main.dropdownField',
        'column': 0,
        'translate': true,
        properties: {
          'values': [
            'One', 'Two', 'Three', 'Four', 'Five'
          ],
          'translatePrefix': 'phoneBook.firstField.values'
        }
      },
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'Dropdown',
        'name': 'dropdownFieldDynamic',
        'label': 'presentation.projection.main.dropdownFieldDynamic',
        'column': 0,
        'translate': true,
        properties: {
          'valuesUrl': 'partnerdocuments/api/dropdown-values',
          'translatePrefix': 'phoneBook.firstField.values'
        }
      },
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'Rich',
        'name': 'htmlField',
        'label': 'presentation.projection.main.htmlField',
        'column': 0,
        'translate': true
      },
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'Chips',
        'name': 'chipsField',
        'label': 'presentation.projection.main.chipsField',
        'column': 0,
        'translate': true
      },
    ];
    projection.properties = [];
    const response = {'presentationOne.additionalFields': projection};
    return of(new HttpResponse({status: 200, body: response}));
  }
}
