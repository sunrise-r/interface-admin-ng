import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {AbstractResponse} from '../../../abstract.response';
import {IadPresentation} from 'iad-interface-admin';

export const presentationConditionCallback = (request) => {
  return request.url.match(/partnercms\/api\/iad\/presentation\/[a-zA-Z0-9]+$/) && request.method === 'GET';
};

// IadProjectionInterface

export class PresentationResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<IadPresentation>> {
    const data = new IadPresentation();
    data.code = 'presentationOne';
    data.projections = [
      {
        'code': 'main',
        'active': false,
        'searchUrl': 'partnerdocuments/api/_search/phonebook',
        'actions': [
          [
            {'code': 'new', 'toggle': true, 'style': 'newBtn'},
            {
              'code': 'copy',
              'toggle': false,
              'style': 'copyBtn'
            },
            {'code': 'operation', 'toggle': true, 'style': 'operationBtn'},
            {
              'code': 'edit',
              'toggle': false,
              'style': 'editBtn'
            },
            {'code': 'delete', 'toggle': false, 'style': 'discardBtn'}
          ],
          [
            {
              'code': 'filter',
              'toggle': true,
              'style': 'filterBtn'
            }
          ],
          [
            {'code': 'REVIEW', 'toggle': false, 'style': 'reviewBtn'},
            {
              'code': 'ACCEPTED',
              'toggle': false,
              'style': 'acceptBtn'
            },
            {'code': 'REJECTED', 'toggle': false, 'style': 'rejectBtn'}
          ],
          [
            {
              'code': 'remind',
              'toggle': false,
              'style': 'remindBtn'
            },
            {'code': 'path', 'toggle': false, 'style': 'pathBtn'}
          ],
          [
            {
              'code': 'documentCard',
              'toggle': false,
              'style': 'cardBtn'
            },
            {'code': 'print', 'toggle': false, 'style': 'printBtn'},
            {
              'code': 'help',
              'toggle': false,
              'style': 'helpBtn'
            },
            {'code': 'refresh', 'toggle': false, 'style': 'refreshBtn'}
          ]
        ],
        'columns': [
          {
            'field': 'nameField',
            'header': 'presentation.projection.main.nameField',
            'formatter': null,
            'displayFormat': 'Link',
            'visible': true,
            'translate': true,
            'searching': true,
            'style': null,
            'sorting': true,
            'position': null,
            'properties': {
              'url': '/#/data/presentation-one/form-projection/edit/',
              'idKey': 'id'
            }
          },
          {
            'field': 'surnameField',
            'header': 'presentation.projection.main.surnameField',
            'formatter': null,
            'displayFormat': 'String',
            'visible': true,
            'translate': true,
            'searching': true,
            'style': null,
            'sorting': true,
            'position': null,
            'properties': null
          },
          {
            'field': 'birthDate',
            'header': 'presentation.projection.main.birthDate',
            'formatter': null,
            'displayFormat': 'ZonedDateTime',
            'visible': true,
            'translate': true,
            'searching': true,
            'style': null,
            'sorting': true,
            'position': null,
            'properties': null
          },
          {
            'field': 'phone',
            'header': 'presentation.projection.main.phone',
            'formatter': null,
            'displayFormat': 'String',
            'visible': true,
            'translate': true,
            'searching': true,
            'style': null,
            'sorting': true,
            'position': null,
            'properties': null
          },
          {
            'field': 'email',
            'header': 'presentation.projection.main.email',
            'formatter': null,
            'displayFormat': 'String',
            'visible': true,
            'translate': true,
            'searching': true,
            'style': null,
            'sorting': true,
            'position': null,
            'properties': null
          },
          {
            'field': 'actions',
            'header': 'presentation.projection.main.actions',
            'translate': true,
            'visible': true,
            'formatter': 'actions',
            'displayFormat': 'edit|delete',
            'properties': {
              'editUrl': '/data/presentation-one/form-projection/edit',
              'deleteUrl': '/partnerdocuments/api/phonebook/delete',
              'projectionCode': 'main'
            }
          }
        ],
        'settingsGroupName': null,
        'resourceSearchUrl': null,
        'label': 'presentation.projection.main.label',
        'filters': [],
        'loadActualInfo': null
      }
    ];
    data.formProjections = [
      {
        'className': 'CustomClass',
        'code': 'formProjection',
        'title': 'Редактирование',
        'fields': [
          {
            'validationTypes': {'minLength': '5', 'maxLength': '20', 'email': false, 'required': true},
            'type': 'String',
            'name': 'nameField',
            'label': 'presentation.projection.main.nameField',
            'translate': true,
            'column': 0
          },
          {
            'validationTypes': {'email': false, 'required': true},
            'type': 'String',
            'name': 'surnameField',
            'label': 'presentation.projection.main.surnameField',
            'translate': true,
            'column': 0
          },
          {
            'validationTypes': {'email': false, 'required': true},
            'type': 'ZonedDateTime',
            'name': 'birthDate',
            'label': 'presentation.projection.main.birthDate',
            'translate': true,
            'defaultValue': 'NOW',
            'column': 0
          },
          {
            'validationTypes': {'maxLength': '15', 'email': false, 'required': false},
            'type': 'String',
            'name': 'phone',
            'label': 'presentation.projection.main.phone',
            'translate': true,
            'column': 0,
            'inputMask': '(999) 999-99-99'
          },
          {
            'validationTypes': {'maxLength': '256', 'email': true, 'required': true},
            'type': 'String',
            'name': 'email',
            'label': 'presentation.projection.main.email',
            'translate': true,
            'column': 0
          },
          {
            'validationTypes': {'email': false, 'required': false},
            'type': 'ProjectionReference',
            'name': 'additionalFields',
            'label': 'presentation.projection.main.additionalFields',
            'translate': true,
            'column': 0,
            'referenceProjectionCode': 'additionalFields',
            'presentationCode': 'presentationOne',
            'properties': {
              'plainReference': true
            }
          },
          {
            'validationTypes': {'email': false, 'required': false},
            'type': 'Hidden',
            'name': 'hiddenStatus',
            'label': 'Скрытый статус',
            'defaultValue': 'ACTIVE',
            'column': 0,
            'translate': false,
            'properties': {}
          }
        ],
        'properties': null
      }
    ];
    data.dataProjections = [];
    return of(new HttpResponse({status: 200, body: data}));
  }
}
