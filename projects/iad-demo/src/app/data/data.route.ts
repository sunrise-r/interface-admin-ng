import {Routes} from '@angular/router';
import {DataComponent} from './data.component';
import {HomeComponent} from './home/home.component';
import {GridComponent} from './grid/grid.component';
import {PresentationResolverService} from './resolvers/presentation-resolver.service';
import {ProjectionNameResolverService} from './resolvers/projection-name-resolver.service';

export const dataRoutes: Routes = <Routes>[
  {
    path: '',
    redirectTo: '/data',
    pathMatch: 'full'
  },
  {
    path: 'data',
    component: DataComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':presentationCode/:projectionCode',
        component: GridComponent,
        resolve: {
          presentation: PresentationResolverService,
          projectionCode: ProjectionNameResolverService
        }
      }
    ]
  }
];
