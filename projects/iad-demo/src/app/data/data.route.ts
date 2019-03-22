import {Routes} from '@angular/router';
import {DataComponent} from './data.component';

export const dataRoutes: Routes = <Routes>[
  {
    path: 'data',
    children: [
      {
        path: ':presentationCode/:projectionCode',
        component: DataComponent,
        resolve: {}
      }
    ]
  }
];
