import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

import {AbstractResponse} from './abstract.response';
import {PresentationTreeModel, ProjectionTreeModel} from 'iad-interface-admin';

export const projectionTreeConditionCallback = (request) => request.url.match(/\/api\/projection-tree$/) && request.method === 'GET';

export class ProjectionTreeResponse extends AbstractResponse {
  getResponse(): Observable<HttpResponse<PresentationTreeModel[]>> {

    const data: PresentationTreeModel[] = [
      <PresentationTreeModel>{
        code: 'presentationOne',
        label: 'presentation.label',
        projections: [
          <ProjectionTreeModel>{
            routerLink: ['/data/presentation-one/show-projection-one'],
            code: 'projectionOne',
            label: 'presentation.projection.listProjectionOne'
          },
          <ProjectionTreeModel>{
            routerLink: ['/data/presentation-one/show-projection-two'],
            code: 'projectionTwo',
            label: 'presentation.projection.listProjectionTwo'
          },
          <ProjectionTreeModel>{
              routerLink: ['/data/presentation-one/form-projection/edit/42'],
              code: 'formProjectionTwo',
              label: 'presentation.formProjection.filledForm'
          },
          <ProjectionTreeModel>{
            routerLink: ['/data/presentation-one/form-projection/edit/123'],
            code: 'formProjectionTwo',
            label: 'presentation.formProjection.emptyForm'
          }
        ]
      },
      <PresentationTreeModel>{
        code: 'presentationTwo',
        label: 'presentation.label2',
        projections: [
          <ProjectionTreeModel>{
            routerLink: ['/data/presentation-two/show-projection-one'],
            code: 'projectionOne',
            label: 'presentation.projection.label'
          }
        ]
      }
    ];
    return of(new HttpResponse({ status: 200, body: data }));
  }
}
