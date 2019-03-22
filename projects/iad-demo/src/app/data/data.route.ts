import {Routes} from '@angular/router';
import {DataComponent} from './data.component';

export const dataRoutes: Routes = <Routes>[
  {
    path: '',
    redirectTo: '/data',
    pathMatch: 'full'
  },
  {
    path: 'data',
    resolve: {},
    data: {
      pageTitle: 'home.title'
    },
    children: [
      {
        path: ':presentationCode/:projectionCode',
        component: DataComponent,
        resolve: {}
      }
    ]
  }
];
