import { NgModule } from '@angular/core';

import { SharedModule } from 'primeng/shared';

import { IadPrimengModule } from '../iad-primeng/iad-primeng.module';

import { TableHeaderMenuComponent } from './table-header-menu/table-header-menu.component';
import { TableSortIconComponent } from './table-sort-icon/table-sort-icon.component';
import { TableColumnFilterComponent } from './table-column-filter/table-column-filter.component';

import { TableColumnSizeDirective } from './table-column-size/table-column-size.directive';
import { DataTableComponent } from './data-table/data-table.component';

import { ToolbarModule } from '../toolbar/toolbar.module';
import { DataTableTdHostDirective } from './data-table/data-table-td.directive.component';

import { SelectionIndicatorColumnComponent } from './column-components/selection-indicator-column.component';
import { DefaultColumnComponent } from './column-components/default-column.component';
import { SpecialColumnComponent } from './column-components/special-column.component';
import { FilterBuilderModule } from '../filter-builder/filter-builder.module';
import { IADCommonModule } from '../common/iad-common.module';
import { IadSharedModule } from '../shared/iad-shared.module';

@NgModule({
    imports: [IadSharedModule, SharedModule, IADCommonModule, IadPrimengModule, ToolbarModule, FilterBuilderModule],
    declarations: [
        SelectionIndicatorColumnComponent,
        TableHeaderMenuComponent,
        TableSortIconComponent,
        TableColumnFilterComponent,
        DataTableComponent,
        TableColumnSizeDirective,
        DataTableTdHostDirective,
        DefaultColumnComponent,
        SpecialColumnComponent
    ],
    entryComponents: [DefaultColumnComponent, SelectionIndicatorColumnComponent, SpecialColumnComponent],
    exports: [TableColumnFilterComponent, DataTableComponent, SelectionIndicatorColumnComponent]
})
export class IADDataTableModule {}
