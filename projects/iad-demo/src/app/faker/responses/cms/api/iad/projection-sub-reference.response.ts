import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { AbstractResponse } from '../../../abstract.response';
import { IadFormProjection } from 'iad-interface-admin/form';

export const projectionSubReferenceConditionCallback = (request) => {
    return request.url.match(/partnercms\/api\/iad\/form-projection\/form+$/) && request.method === 'GET' && request.params.toString() === 'presentationOne=additionalSubFields';
};

// IadProjectionInterface

export class ProjectionSubReferenceResponse extends AbstractResponse {
    getResponse(): Observable<HttpResponse<{ [param: string]: IadFormProjection }>> {
        const projection = new IadFormProjection();
        projection.code = 'additionalSubFields';
        projection.title = 'Ссылка ссылки';
        projection.fields = [
            {
                'validationTypes': {'email': false, 'required': false},
                'type': 'String',
                'name': 'socialNetwork1',
                'label': 'Ссылка в соц. сети',
                'defaultValue': '',
                'column': 0,
                'translate': false,
                'properties': {}
            },
            {
                'validationTypes': {'email': false, 'required': false},
                'type': 'String',
                'name': 'socialNetwork2',
                'label': 'Ссылка в соц. сети',
                'defaultValue': '',
                'column': 0,
                'translate': false,
                'properties': {}
            },
        ];
        projection.properties = [];
        const response = {'presentationOne.additionalSubFields': projection};
        return of(new HttpResponse({status: 200, body: response}));
    }
}
