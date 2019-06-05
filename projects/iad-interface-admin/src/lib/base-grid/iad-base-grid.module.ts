import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/shared';
import { IadPrimengModule, IadSharedModule } from 'iad-interface-admin/core';
import { FilterBuilderModule } from 'iad-interface-admin/filter';

import { TableHeaderMenuComponent } from './table-header-menu/table-header-menu.component';
import { TableSortIconComponent } from './table-sort-icon/table-sort-icon.component';
import { TableColumnFilterComponent } from './table-column-filter/table-column-filter.component';

import { TableColumnSizeDirective } from './table-column-size/table-column-size.directive';
import { BaseGridComponent } from './base-grid/base-grid.component';

import { ToolbarModule } from 'iad-interface-admin';
import { BaseGridTdHostDirective } from './base-grid/base-grid-td-host.directive';

import { SelectionIndicatorColumnComponent } from './column-components/selection-indicator-column.component';
import { DefaultColumnComponent, StatusPipe } from './column-components/default-column.component';
import { SpecialColumnComponent } from './column-components/special-column.component';

@NgModule({
    imports: [IadSharedModule, SharedModule, IadPrimengModule, ToolbarModule, FilterBuilderModule],
    declarations: [
        SelectionIndicatorColumnComponent,
        TableHeaderMenuComponent,
        TableSortIconComponent,
        TableColumnFilterComponent,
        BaseGridComponent,
        TableColumnSizeDirective,
        BaseGridTdHostDirective,
        StatusPipe,
        DefaultColumnComponent,
        SpecialColumnComponent,
        GridComponent,
        GridTdHostDirective,
        SelectionIndicatorColumnComponent,
        DefaultColumnComponent,
        SpecialColumnComponent,
        ActionsColumnComponent,
        ChipsColumnComponent
    ],
    entryComponents: [
        DefaultColumnComponent, SelectionIndicatorColumnComponent, SpecialColumnComponent,
        SelectionIndicatorColumnComponent,
        DefaultColumnComponent,
        SpecialColumnComponent,
        ActionsColumnComponent,
        ChipsColumnComponent
    ],
    exports: [TableColumnFilterComponent, BaseGridComponent, SelectionIndicatorColumnComponent]
})
export class IadBaseGridModule {}

import { GridComponent } from './grid/grid.component';
import { GridTdHostDirective } from './grid/grid-td-host.directive';
import { SelectionIndicatorColumnComponent } from './column-components/selection-indicator-column.component';
import { DefaultColumnComponent } from './column-components/default-column.component';
import { SpecialColumnComponent } from './column-components/special-column.component';
import { ActionsColumnComponent } from './column-components/actions-column.component';
import { ChipsColumnComponent } from './column-components/chips-column.component';
