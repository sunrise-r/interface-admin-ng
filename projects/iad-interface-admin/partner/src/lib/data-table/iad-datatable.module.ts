import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/shared';
import { IadPrimengModule, IadSharedModule } from 'iad-interface-admin/core';
import { FilterBuilderModule } from 'iad-interface-admin/filter';

import { TableHeaderMenuComponent } from './table-header-menu/table-header-menu.component';
import { TableSortIconComponent } from './table-sort-icon/table-sort-icon.component';
import { TableColumnFilterComponent } from './table-column-filter/table-column-filter.component';

import { TableColumnSizeDirective } from './table-column-size/table-column-size.directive';
import { DataTableComponent } from './data-table/data-table.component';

import { ToolbarModule } from 'iad-interface-admin';
import { DataTableTdHostDirective } from './data-table/data-table-td.directive.component';

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
        DataTableComponent,
        TableColumnSizeDirective,
        DataTableTdHostDirective,
        StatusPipe,
        DefaultColumnComponent,
        SpecialColumnComponent
    ],
    entryComponents: [DefaultColumnComponent, SelectionIndicatorColumnComponent, SpecialColumnComponent],
    exports: [TableColumnFilterComponent, DataTableComponent, SelectionIndicatorColumnComponent]
})
export class IADDataTableModule {}
