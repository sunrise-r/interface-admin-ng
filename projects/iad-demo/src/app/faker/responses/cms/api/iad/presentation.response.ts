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
          // {
          //   'field': 'fieldOne',
          //   'header': 'presentation.projection.fieldOne',
          //   'formatter': 'SpecialColumnComponent',
          //   'displayFormat': 'info',
          //   'visible': true,
          //   'translate': true,
          //   'searching': false,
          //   'style': 'ui-column-gray',
          //   'sorting': false,
          //   'position': 'const-froz-right',
          //   'properties': {'width': '20px', 'hasColumnMenu': false, 'resizable': false, 'reorderable': false}
          // },
          // {
          //   'field': 'onResolution',
          //   'header': 'partnerGatewayApp.partnerDocumentsEntity.onResolution',
          //   'formatter': 'SpecialColumnComponent',
          //   'displayFormat': 'resolution',
          //   'visible': true,
          //   'translate': true,
          //   'searching': false,
          //   'style': 'ui-column-gray',
          //   'sorting': false,
          //   'position': 'const-froz-right',
          //   'properties': {'width': '20px', 'hasColumnMenu': false, 'resizable': false, 'reorderable': false}
          // },
          // {
          //   'field': 'onOperation',
          //   'header': 'partnerGatewayApp.partnerDocumentsEntity.onOperation',
          //   'formatter': 'SpecialColumnComponent',
          //   'displayFormat': 'operation',
          //   'visible': true,
          //   'translate': true,
          //   'searching': false,
          //   'style': 'ui-column-gray',
          //   'sorting': false,
          //   'position': 'const-froz-right',
          //   'properties': {'width': '20px', 'hasColumnMenu': false, 'resizable': false, 'reorderable': false}
          // },
          // {
          //   'field': 'status',
          //   'header': 'partnerGatewayApp.partnerDocumentsEntity.status',
          //   'formatter': 'SpecialColumnComponent',
          //   'displayFormat': 'status',
          //   'visible': true,
          //   'translate': true,
          //   'searching': false,
          //   'style': 'ui-column-gray',
          //   'sorting': false,
          //   'position': 'const-froz-right',
          //   'properties': {'width': '20px', 'hasColumnMenu': false, 'resizable': false, 'reorderable': false}
          // },
          {
            'field': 'nameField',
            'header': 'presentation.projection.main.nameField',
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
              'editUrl': '/data/presentation-one/form-projection/edit'
            }
          }
        ],
        'settingsGroupName': null,
        'resourceSearchUrl': null,
        'label': 'presentation.projection.main.label',
        'filters': [],
        'loadActualInfo': null
      }
      // <DocumentListProjection>{
      //   'code': 'reference',
      //   'active': false,
      //   'searchUrl': null,
      //   'actions': [
      //     [
      //       {'code': 'path', 'toggle': false, 'style': 'pathBtn'}
      //     ],
      //     [
      //       {
      //         'code': 'documentCard',
      //         'toggle': false,
      //         'style': 'cardBtn'
      //       },
      //       {'code': 'print', 'toggle': false, 'style': 'printBtn'}
      //     ]
      //   ],
      //   'columns': [
      //     {
      //       'field': 'creationDate',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.creationDate',
      //       'formatter': null,
      //       'displayFormat': 'ZonedDateTime',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'documentClassLabel',
      //       'header': 'additionalFields.documentClassLabel',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'branchName',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.branchName',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'paymentAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.paymentAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'correspondentAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.correspondentAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'bankIdentificationAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.bankIdentificationAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'bankName',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.bankName',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'accountType',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.accountType',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'archive',
      //       'header': 'additionalFields.archive',
      //       'formatter': null,
      //       'displayFormat': 'Boolean',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     }
      //   ],
      //   'settingsGroupName': null,
      //   'resourceSearchUrl': null,
      //   'label': 'partnerGatewayApp.partnerDocumentsBankAccount.home.title',
      //   'filters': [],
      //   'loadActualInfo': null
      // }
      // ,
      // ,
      // <DocumentListProjection>{
      //   'code': 'lookupSourceListProjection',
      //   'active': false,
      //   'searchUrl': 'partnerdocuments/api/_search/branch-bank-accounts',
      //   'actions': [
      //     [
      //       {'code': 'path', 'toggle': false, 'style': 'pathBtn'}
      //     ],
      //     [
      //       {
      //         'code': 'documentCard',
      //         'toggle': false,
      //         'style': 'cardBtn'
      //       },
      //       {'code': 'print', 'toggle': false, 'style': 'printBtn'},
      //       {'code': 'refresh', 'toggle': false, 'style': 'refreshBtn'}
      //     ]
      //   ],
      //   'columns': [
      //     {
      //       'field': 'creationDate',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.creationDate',
      //       'formatter': null,
      //       'displayFormat': 'ZonedDateTime',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'documentClassLabel',
      //       'header': 'additionalFields.documentClassLabel',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'branchName',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.branchName',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'paymentAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.paymentAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'correspondentAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.correspondentAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'bankIdentificationAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.bankIdentificationAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'bankName',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.bankName',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'accountType',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.accountType',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     }
      //   ],
      //   'settingsGroupName': null,
      //   'resourceSearchUrl': null,
      //   'label': 'partnerGatewayApp.partnerDocuments.BranchBankAccount.label',
      //   'filters': null,
      //   'loadActualInfo': null
      // },
      // <DocumentListProjection>{
      //   'code': 'BankAccountViewListProjection',
      //   'active': false,
      //   'searchUrl': null,
      //   'actions': [
      //     [
      //       {'code': 'path', 'toggle': false, 'style': 'pathBtn'}
      //     ],
      //     [
      //       {
      //         'code': 'documentCard',
      //         'toggle': false,
      //         'style': 'cardBtn'
      //       },
      //       {'code': 'print', 'toggle': false, 'style': 'printBtn'}
      //     ]
      //   ],
      //   'columns': [
      //     {
      //       'field': 'creationDate',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.creationDate',
      //       'formatter': null,
      //       'displayFormat': 'ZonedDateTime',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'documentClassLabel',
      //       'header': 'additionalFields.documentClassLabel',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'branchName',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.branchName',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'paymentAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.paymentAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'correspondentAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.correspondentAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'bankIdentificationAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.bankIdentificationAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'bankName',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.bankName',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'accountType',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.accountType',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     }
      //   ],
      //   'settingsGroupName': null,
      //   'resourceSearchUrl': null,
      //   'label': 'partnerGatewayApp.partnerDocuments.tabs.documentView',
      //   'filters': null,
      //   'loadActualInfo': null
      // },
      // <DocumentListProjection>{
      //   'code': 'lookupViewListProjection',
      //   'active': false,
      //   'searchUrl': null,
      //   'actions': [
      //     [
      //       {'code': 'add', 'toggle': false, 'style': 'addBtn'},
      //       {
      //         'code': 'remove',
      //         'toggle': false,
      //         'style': 'removeBtn'
      //       }
      //     ],
      //     [
      //       {'code': 'path', 'toggle': false, 'style': 'pathBtn'}
      //     ],
      //     [
      //       {
      //         'code': 'documentCard',
      //         'toggle': false,
      //         'style': 'cardBtn'
      //       },
      //       {'code': 'print', 'toggle': false, 'style': 'printBtn'}
      //     ]
      //   ],
      //   'columns': [
      //     {
      //       'field': 'creationDate',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.creationDate',
      //       'formatter': null,
      //       'displayFormat': 'ZonedDateTime',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'documentClassLabel',
      //       'header': 'additionalFields.documentClassLabel',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'branchName',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.branchName',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'paymentAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.paymentAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'correspondentAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.correspondentAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'bankIdentificationAccount',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.bankIdentificationAccount',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'bankName',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.bankName',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     },
      //     {
      //       'field': 'accountType',
      //       'header': 'partnerGatewayApp.partnerDocumentsBankAccount.accountType',
      //       'formatter': null,
      //       'displayFormat': 'String',
      //       'visible': true,
      //       'translate': true,
      //       'searching': true,
      //       'style': null,
      //       'sorting': true,
      //       'position': null,
      //       'properties': null
      //     }
      //   ],
      //   'settingsGroupName': null,
      //   'resourceSearchUrl': null,
      //   'label': 'partnerGatewayApp.partnerDocumentsBranchBankAccount.home.title',
      //   'filters': null,
      //   'loadActualInfo': null
      // }
    ];
    data.formProjections = [
      {
        'className': 'CustomClass',
        'code': 'formProjection',
        'title': 'Редактирование',
        'fields': [
          {
            'validationTypes': {'maxLength': '20', 'email': false, 'required': true},
            'type': 'String',
            'name': 'nameField',
            'label': 'presentation.projection.main.nameField',
            'translate': true,
            'column': 0,
            'hidden': false,
            'visible': true
          },
          {
            'validationTypes': {'maxLength': '20', 'email': false, 'required': true},
            'type': 'String',
            'name': 'surnameField',
            'label': 'presentation.projection.main.surnameField',
            'translate': true,
            'column': 0,
            'hidden': false,
            'visible': true
          },
          {
            'validationTypes': {'email': false, 'required': true},
            'type': 'ZonedDateTime',
            'name': 'birthDate',
            'label': 'presentation.projection.main.birthDate',
            'translate': true,
            'defaultValue': 'NOW',
            'column': 0,
            'hidden': false,
            'visible': true
          },
          {
            'validationTypes': {'maxLength': '10', 'email': false, 'required': false},
            'type': 'String',
            'name': 'phone',
            'label': 'presentation.projection.main.phone',
            'translate': true,
            'column': 0,
            'hidden': false,
            'visible': true,
            'inputMask': '(999) 999-99-99'
          },
          {
            'validationTypes': {'maxLength': '256', 'email': true, 'required': true},
            'type': 'String',
            'name': 'email',
            'label': 'presentation.projection.main.email',
            'translate': true,
            'column': 0,
            'hidden': false,
            'visible': true
          },
          {
            'validationTypes': {'email': false, 'required': false},
            'type': 'ProjectionReference',
            'name': 'additionalFields',
            'label': 'presentation.projection.main.additionalFields',
            'translate': true,
            'column': 0,
            'hidden': false,
            'visible': true,
            'referenceProjectionCode': 'additionalFields',
            'presentationCode': 'presentationOne'
          },
        ],
        'properties': null
      }
      // {
      //   'className': 'BankAccount',
      //   'code': 'BankAccount',
      //   'title': 'partnerGatewayApp.partnerDocumentsBankAccount.detail.title',
      //   'fields': [
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'type': 'Hidden',
      //       'name': 'id',
      //       'label': '',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': true},
      //       'type': 'ZonedDateTime',
      //       'name': 'creationDate',
      //       'label': 'Дата создания',
      //       'defaultValue': 'NOW',
      //       'fieldInputType': 'DISABLED',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'maxLength': '20', 'email': false, 'required': true},
      //       'type': 'String',
      //       'name': 'paymentAccount',
      //       'label': 'Расчетный счет',
      //       'column': 0,
      //       'hidden': false,
      //       'inputMask': '99999999999999999999'
      //     },
      //     {
      //       'validationTypes': {'maxLength': '20', 'email': false, 'required': true},
      //       'type': 'String',
      //       'name': 'correspondentAccount',
      //       'label': 'Корр. Счет',
      //       'column': 0,
      //       'hidden': false,
      //       'inputMask': '99999999999999999999'
      //     },
      //     {
      //       'validationTypes': {'maxLength': '9', 'email': false, 'required': true},
      //       'type': 'String',
      //       'name': 'bankIdentificationAccount',
      //       'label': 'БИК',
      //       'column': 0,
      //       'hidden': false,
      //       'inputMask': '999999999'
      //     },
      //     {
      //       'validationTypes': {'maxLength': '256', 'email': false, 'required': true},
      //       'type': 'String',
      //       'name': 'bankName',
      //       'label': 'Наименование банка',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'presentationCode': 'common',
      //       'type': 'List',
      //       'name': 'additionalDocuments',
      //       'label': 'Дополнительные документы',
      //       'column': 0,
      //       'hidden': false,
      //       'lookupViewProjectionCode': 'additionalDocumentsLookupViewProjection',
      //       'lookupSourceProjectionCode': 'additionalDocumentsLookupSourceProjection'
      //     },
      //     {
      //       'validationTypes': {'maxLength': '12', 'email': false, 'required': false},
      //       'type': 'String',
      //       'name': 'status',
      //       'label': 'Статус',
      //       'column': 0,
      //       'hidden': true
      //     },
      //     {
      //       'validationTypes': {'maxLength': '50', 'email': false, 'required': false},
      //       'type': 'String',
      //       'name': 'number',
      //       'label': 'Номер',
      //       'column': 0,
      //       'hidden': true
      //     },
      //     {
      //       'validationTypes': {'maxLength': '6', 'email': false, 'required': false},
      //       'type': 'Boolean',
      //       'name': 'archive',
      //       'label': 'Архив',
      //       'column': 0,
      //       'hidden': true
      //     },
      //     {
      //       'validationTypes': {'maxLength': '15', 'email': false, 'required': false},
      //       'type': 'String',
      //       'name': 'operation',
      //       'label': 'Операция',
      //       'column': 0,
      //       'hidden': true
      //     }, {
      //       'validationTypes': {'maxLength': '25', 'email': false, 'required': false},
      //       'type': 'String',
      //       'name': 'documentClassLabel',
      //       'label': 'Вид',
      //       'column': 0,
      //       'hidden': true
      //     }
      //   ],
      //   'properties': null
      // }
      // ,
      // {
      //   'fields': [
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'type': 'Hidden',
      //       'name': 'id',
      //       'label': '',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': true},
      //       'type': 'Hidden',
      //       'name': 'type',
      //       'label': '',
      //       'defaultValue': 'BankAccount.Primary',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': true},
      //       'presentationCode': 'bankAccounts',
      //       'type': 'Entity',
      //       'name': 'document',
      //       'label': '',
      //       'column': 0,
      //       'hidden': false,
      //       'lookupViewProjectionCode': 'BankAccountViewListProjection',
      //       'lookupSourceProjectionCode': '',
      //       'properties': {'disableDropdown': '1'}
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'presentationCode': 'common',
      //       'type': 'List',
      //       'name': 'additionalDocuments',
      //       'label': 'Дополнительные документы',
      //       'column': 0,
      //       'hidden': false,
      //       'lookupViewProjectionCode': 'additionalDocumentsLookupViewProjection',
      //       'lookupSourceProjectionCode': 'additionalDocumentsLookupSourceProjection'
      //     }
      //   ],
      //   'title': 'partnerGatewayApp.partnerDocumentsBankAccount.accountType',
      //   'className': 'BranchBankAccount',
      //   'code': 'BranchBankAccountTypeCorrection',
      //   'properties': {'className': 'BranchBankAccount'}
      // },
      // {
      //   'fields': [
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'type': 'Hidden',
      //       'name': 'id',
      //       'label': '',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': true},
      //       'type': 'ZonedDateTime',
      //       'name': 'creationDate',
      //       'label': 'Дата создания',
      //       'defaultValue': 'NOW',
      //       'fieldInputType': 'DISABLED',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'maxLength': '20', 'email': false, 'required': true},
      //       'type': 'String',
      //       'name': 'paymentAccount',
      //       'label': 'Расчетный счет',
      //       'column': 0,
      //       'hidden': false,
      //       'inputMask': '99999999999999999999'
      //     },
      //     {
      //       'validationTypes': {'maxLength': '20', 'email': false, 'required': true},
      //       'type': 'String',
      //       'name': 'correspondentAccount',
      //       'label': 'Корр. Счет',
      //       'column': 0,
      //       'hidden': false,
      //       'inputMask': '99999999999999999999'
      //     },
      //     {
      //       'validationTypes': {'maxLength': '9', 'email': false, 'required': true},
      //       'type': 'String',
      //       'name': 'bankIdentificationAccount',
      //       'label': 'БИК',
      //       'column': 0,
      //       'hidden': false,
      //       'inputMask': '999999999'
      //     },
      //     {
      //       'validationTypes': {'maxLength': '256', 'email': false, 'required': true},
      //       'type': 'String',
      //       'name': 'bankName',
      //       'label': 'Наименование банка',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'presentationCode': 'branches',
      //       'type': 'Entity',
      //       'name': 'branch',
      //       'label': 'Филиал',
      //       'column': 0,
      //       'hidden': false,
      //       'lookupViewProjectionCode': 'lookupViewListProjection',
      //       'lookupSourceProjectionCode': 'lookupSourceListProjection'
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'presentationCode': 'common',
      //       'type': 'List',
      //       'name': 'additionalDocuments',
      //       'label': 'Дополнительные документы',
      //       'column': 0,
      //       'hidden': false,
      //       'lookupViewProjectionCode': 'additionalDocumentsLookupViewProjection',
      //       'lookupSourceProjectionCode': 'additionalDocumentsLookupSourceProjection'
      //     },
      //     {
      //       'validationTypes': {'maxLength': '12', 'email': false, 'required': false},
      //       'type': 'String',
      //       'name': 'status',
      //       'label': 'Статус',
      //       'column': 0,
      //       'hidden': true
      //     },
      //     {
      //       'validationTypes': {'maxLength': '50', 'email': false, 'required': false},
      //       'type': 'String',
      //       'name': 'number',
      //       'label': 'Номер',
      //       'column': 0,
      //       'hidden': true
      //     },
      //     {
      //       'validationTypes': {'maxLength': '6', 'email': false, 'required': false},
      //       'type': 'Boolean',
      //       'name': 'archive',
      //       'label': 'Архив',
      //       'column': 0,
      //       'hidden': true
      //     },
      //     {
      //       'validationTypes': {'maxLength': '15', 'email': false, 'required': false},
      //       'type': 'String',
      //       'name': 'operation',
      //       'label': 'Операция',
      //       'column': 0,
      //       'hidden': true
      //     },
      //     {
      //       'validationTypes': {'maxLength': '25', 'email': false, 'required': false},
      //       'type': 'String',
      //       'name': 'documentClassLabel',
      //       'label': 'Вид',
      //       'column': 0,
      //       'hidden': true
      //     }
      //   ],
      //   'title': 'partnerGatewayApp.partnerDocumentsBranchBankAccount.detail.title',
      //   'className': 'BranchBankAccount',
      //   'code': 'BranchBankAccount',
      //   'properties': null
      // },
      // {
      //   'fields': [
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'type': 'Hidden',
      //       'name': 'id',
      //       'label': '',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': true},
      //       'type': 'Hidden',
      //       'name': 'type',
      //       'label': '',
      //       'defaultValue': 'BankAccount.Primary',
      //       'column': 0,
      //       'hidden': false
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': true},
      //       'presentationCode': 'bankAccounts',
      //       'type': 'Entity',
      //       'name': 'document',
      //       'label': '',
      //       'column': 0,
      //       'hidden': false,
      //       'lookupViewProjectionCode': 'BankAccountViewListProjection',
      //       'lookupSourceProjectionCode': '',
      //       'properties': {'disableDropdown': '1'}
      //     },
      //     {
      //       'validationTypes': {'email': false, 'required': false},
      //       'presentationCode': 'common',
      //       'type': 'List',
      //       'name': 'additionalDocuments',
      //       'label': 'Дополнительные документы',
      //       'column': 0,
      //       'hidden': false,
      //       'lookupViewProjectionCode': 'additionalDocumentsLookupViewProjection',
      //       'lookupSourceProjectionCode': 'additionalDocumentsLookupSourceProjection'
      //     }
      //   ],
      //   'title': 'partnerGatewayApp.partnerDocumentsBankAccount.accountType',
      //   'label': null,
      //   'className': 'BranchBankAccount',
      //   'code': 'BankAccountTypeCorrection',
      //   'properties': {'className': 'BankAccount'}
      // }
    ];
    data.dataProjections = [];
    return of(new HttpResponse({status: 200, body: data}));
  }
}
