import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/shared';
import { IadPrimengModule, IadSharedModule } from 'iad-interface-admin/core';
import { FilterBuilderModule } from 'iad-interface-admin/filter';


import { TableHeaderMenuComponent } from './table-header-menu/table-header-menu.component';
import { TableSortIconDirective } from './table-sort-icon/table-sort-icon.directive';
import { TableColumnFilterComponent } from './table-column-filter/table-column-filter.component';

import { TableColumnSizeDirective } from './table-column-size/table-column-size.directive';
import { BaseGridComponent } from './base-grid/base-grid.component';

import { BaseGridTdHostDirective } from './base-grid/base-grid-td-host.directive';

import { DefaultColumnComponent } from './column-components/default-column.component';

import { ActionsColumnComponent } from './column-components/actions-column.component';
import { ChipsColumnComponent } from './column-components/chips-column.component';

@NgModule({
    imports: [IadSharedModule, SharedModule, IadPrimengModule, FilterBuilderModule],
    declarations: [
        TableHeaderMenuComponent,
        TableSortIconDirective,
        TableColumnFilterComponent,
        BaseGridComponent,
        TableColumnSizeDirective,
        BaseGridTdHostDirective,
        DefaultColumnComponent,
        ActionsColumnComponent,
        ChipsColumnComponent
    ],
    entryComponents: [
        DefaultColumnComponent,
        ActionsColumnComponent,
        ChipsColumnComponent
    ],
    exports: [TableColumnFilterComponent, BaseGridComponent, TableColumnSizeDirective, TableSortIconDirective]
})
export class IadBaseGridModule {}
