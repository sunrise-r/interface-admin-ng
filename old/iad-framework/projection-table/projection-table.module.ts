import { NgModule } from '@angular/core';
import { PartnerGatewaySharedModule } from 'app/shared';
import { ToolbarModule } from '../toolbar';
import { IadSettingsTableModule } from '../iad-settings-table';

import { ProjectionTableComponent } from './';

@NgModule({
    imports: [PartnerGatewaySharedModule, ToolbarModule, IadSettingsTableModule],
    declarations: [ProjectionTableComponent],
    exports: [IadSettingsTableModule, ProjectionTableComponent]
})
export class ProjectionTableModule {}
