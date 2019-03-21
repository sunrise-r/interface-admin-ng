import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {AbstractResponse} from './abstract.response';
import {PresentationTreeModel, ProjectionTreeModel} from 'iad-interface-admin';

export const projectionTreeConditionCallback = (request) => request.url.match(/\/api\/projection-tree$/) && request.method === 'GET';

export class ProjectionTreeResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<PresentationTreeModel[]>> {

    const data: PresentationTreeModel[] = [
      <PresentationTreeModel>{
        code: 'myPresentation',
        label: 'projection.label',
        projections: [
          <ProjectionTreeModel>{
            url: 'http://yandex.ru/',
            code: 'myProjection',
            label: 'my.projection.label'
          }
        ]
      }
    ];
    return of(new HttpResponse({ status: 200, body: data }));
  }
}
