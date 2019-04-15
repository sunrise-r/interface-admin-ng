import { NgModule } from '@angular/core';
import { PartnerGatewaySharedModule } from 'app/shared';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { IadSettingsTableModule } from '../iad-settings-table/iad-settings-table.module';

import { ProjectionTableComponent } from './projection-table.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';

import { DropdownColumnSelectorComponent } from './dropdown-column-selector/dropdown-column-selector.component';

// BAD OPTION
import { CustomizeModule } from 'app/customize';

@NgModule({
    imports: [PartnerGatewaySharedModule, ToolbarModule, IadSettingsTableModule, CustomizeModule],
    declarations: [ProjectionTableComponent, TableToolbarComponent, DropdownColumnSelectorComponent],
    exports: [IadSettingsTableModule, ProjectionTableComponent, TableToolbarComponent]
})
export class ProjectionTableModule {}
