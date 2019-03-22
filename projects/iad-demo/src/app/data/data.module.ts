import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data.component';
import {RouterModule} from '@angular/router';
import {dataRoutes} from './data.route';

@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(dataRoutes)
  ]
})
export class DataModule { }
