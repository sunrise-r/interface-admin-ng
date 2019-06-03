import { NgModule } from '@angular/core';
import { ToolbarModule } from 'iad-interface-admin';
import { IadSharedModule } from 'iad-interface-admin/core';

import { IadSettingsTableModule } from '../iad-settings-table/iad-settings-table.module';

import { ProjectionTableComponent } from './projection-table.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { TableSearchPanelComponent } from './table-search-panel/table-search-panel.component';

@NgModule({
    imports: [IadSharedModule, ToolbarModule, IadSettingsTableModule],
    declarations: [ProjectionTableComponent, TableToolbarComponent, TableSearchPanelComponent],
    exports: [IadSettingsTableModule, ProjectionTableComponent, TableToolbarComponent]
})
export class ProjectionTableModule {}
