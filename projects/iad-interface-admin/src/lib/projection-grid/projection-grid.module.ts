import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectionGridComponent } from './projection-grid/projection-grid.component';
import {SharedModule} from '../shared/shared.module';
import {IadPrimengModule} from '../iad-primeng';
import {TableColumnSizeDirective} from './table-column-size/table-column-size.directive';
import {TableSortIconComponent} from './table-sort-icon/table-sort-icon.component';

@NgModule({
  declarations: [ProjectionGridComponent, TableColumnSizeDirective, TableSortIconComponent],
  imports: [
    IadPrimengModule,
    SharedModule,
    CommonModule
  ]
})
export class ProjectionGridModule { }
