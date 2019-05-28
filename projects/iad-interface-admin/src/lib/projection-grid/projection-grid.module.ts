import { NgModule } from '@angular/core';
import { ProjectionGridComponent } from './projection-grid/projection-grid.component';
import {IadSharedModule, IadPrimengModule} from 'iad-interface-admin/core';
import {TableColumnSizeDirective} from './table-column-size/table-column-size.directive';
import {TableSortIconComponent} from './table-sort-icon/table-sort-icon.component';
import {TableColumnFilterComponent} from './table-column-filter/table-column-filter.component';
import { GridComponent } from './grid/grid.component';
import {GridTdHostDirective} from './grid/grid-td-host.directive';
import {SelectionIndicatorColumnComponent} from './column-components/selection-indicator-column.component';
import {DefaultColumnComponent} from './column-components/default-column.component';
import {SpecialColumnComponent} from './column-components/special-column.component';
import {ActionsColumnComponent} from './column-components/actions-column.component';
import {ChipsColumnComponent} from './column-components/chips-column.component';

@NgModule({
  declarations: [
    ProjectionGridComponent,
    TableColumnSizeDirective,
    TableSortIconComponent,
    TableColumnFilterComponent,
    GridComponent,
    GridTdHostDirective,
    SelectionIndicatorColumnComponent,
    DefaultColumnComponent,
    SpecialColumnComponent,
    ActionsColumnComponent,
    ChipsColumnComponent
  ],
  imports: [
    IadPrimengModule,
    IadSharedModule,
  ],
  entryComponents: [
    SelectionIndicatorColumnComponent,
    DefaultColumnComponent,
    SpecialColumnComponent,
    ActionsColumnComponent,
    ChipsColumnComponent
  ],
  exports: [ProjectionGridComponent, TableColumnSizeDirective, TableSortIconComponent]
})
export class ProjectionGridModule { }
