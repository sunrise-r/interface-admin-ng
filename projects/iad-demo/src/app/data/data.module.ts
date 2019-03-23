import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { DataComponent } from './data.component';
import {RouterModule} from '@angular/router';
import {dataRoutes} from './data.route';
import { GridComponent } from './grid/grid.component';
import {IadSharedModule} from '../shared';
import { HomeComponent } from './home/home.component';
import {IadInterfaceAdminModule} from 'iad-interface-admin';

@NgModule({
  declarations: [DataComponent, GridComponent, HomeComponent],
  imports: [
    IadSharedModule,
    RouterModule.forChild(dataRoutes),
    IadInterfaceAdminModule.forChild({
      i18nEnabled: true,
      defaultI18nLang: 'ru',
      noi18nMessage: 'translation-not-found'
    })
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DataModule { }
