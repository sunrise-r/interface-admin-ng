import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { DataComponent } from './data.component';
import {RouterModule} from '@angular/router';
import {dataRoutes} from './data.route';
import { GridComponent } from './grid/grid.component';
import {IadSharedModule} from '../shared';

@NgModule({
  declarations: [DataComponent, GridComponent],
  imports: [
    IadSharedModule,
    RouterModule.forChild(dataRoutes)
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DataModule { }
