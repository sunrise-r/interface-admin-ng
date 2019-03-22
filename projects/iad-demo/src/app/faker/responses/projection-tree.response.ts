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
        label: 'presentation.label',
        projections: [
          <ProjectionTreeModel>{
            url: 'http://yandex.ru/',
            code: 'myProjection',
            label: 'presentation.projection.label'
          },
          <ProjectionTreeModel>{
            url: 'http://yandex.ru/',
            code: 'myProjection2',
            label: 'presentation.projection.label2'
          }
        ]
      },
      <PresentationTreeModel>{
        code: 'myPresentation2',
        label: 'presentation.label2',
        projections: [
          <ProjectionTreeModel>{
            url: 'http://yandex.ru/',
            code: 'myProjection',
            label: 'presentation.projection.label'
          }
        ]
      }
    ];
    return of(new HttpResponse({ status: 200, body: data }));
  }
}
