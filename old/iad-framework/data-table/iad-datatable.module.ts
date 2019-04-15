import { NgModule } from '@angular/core';
import { PartnerGatewaySharedModule } from 'app/shared';

import { SharedModule } from 'primeng/shared';
import { ObjectUtils } from 'primeng/components/utils/objectutils';

import { CustomizeModule } from 'app/customize';
import { IadPrimengModule } from '../iad-primeng/iad-primeng.module';

import { TableHeaderMenuComponent } from './table-header-menu/table-header-menu.component';
import { TableSortIconComponent } from './table-sort-icon/table-sort-icon.component';
import { TableColumnFilterComponent } from './table-column-filter/table-column-filter.component';
import { TableSearchPanelComponent } from './table-search-panel/table-search-panel.component';

import { TableColumnSizeDirective } from './table-column-size/table-column-size.directive';
import { DataTableComponent } from './data-table/data-table.component';

import { ToolbarModule } from '../toolbar/toolbar.module';
import { DataTableTdHostDirective } from './data-table/data-table-td.directive.component';

import { SelectionIndicatorColumnComponent } from './column-components/selection-indicator-column.component';
import { DefaultColumnComponent } from './column-components/default-column.component';
import { SpecialColumnComponent } from './column-components/special-column.component';
import { FilterBuilderModule } from '../filter-builder/filter-builder.module';

@NgModule({
    imports: [PartnerGatewaySharedModule, SharedModule, CustomizeModule, IadPrimengModule, ToolbarModule, FilterBuilderModule],
    declarations: [
        SelectionIndicatorColumnComponent,
        TableHeaderMenuComponent,
        TableSortIconComponent,
        TableColumnFilterComponent,
        DataTableComponent,
        TableColumnSizeDirective,
        TableSearchPanelComponent,
        DataTableTdHostDirective,
        DefaultColumnComponent,
        SpecialColumnComponent
    ],
    providers: [ObjectUtils],
    entryComponents: [DefaultColumnComponent, SelectionIndicatorColumnComponent, SpecialColumnComponent],
    exports: [TableColumnFilterComponent, DataTableComponent, SelectionIndicatorColumnComponent]
})
export class IADDataTableModule {}
