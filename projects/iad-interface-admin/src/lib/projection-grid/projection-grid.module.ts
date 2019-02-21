import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectionGridComponent } from './projection-grid/projection-grid.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ProjectionGridComponent],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class ProjectionGridModule { }
