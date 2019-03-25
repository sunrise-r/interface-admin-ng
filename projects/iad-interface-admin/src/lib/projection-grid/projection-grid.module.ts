import { NgModule } from '@angular/core';
import { ProjectionGridComponent } from './projection-grid/projection-grid.component';
import {IadSharedModule} from '../shared/iad-shared.module';
import {IadPrimengModule} from '../iad-primeng/iad-primeng.module';
import {TableColumnSizeDirective} from './table-column-size/table-column-size.directive';
import {TableSortIconComponent} from './table-sort-icon/table-sort-icon.component';
import {TableColumnFilterComponent} from './table-column-filter/table-column-filter.component';

@NgModule({
  declarations: [ProjectionGridComponent, TableColumnSizeDirective, TableSortIconComponent, TableColumnFilterComponent],
  imports: [
    IadPrimengModule,
    IadSharedModule,
  ],
  exports: [ProjectionGridComponent, TableColumnSizeDirective, TableSortIconComponent]
})
export class ProjectionGridModule { }
