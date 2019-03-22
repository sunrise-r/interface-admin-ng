import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { ToolbarModule } from '../toolbar';
import { ProjectionTableModule } from '../projection-table';

import { TabbedViewComponent } from './';

@NgModule({
    imports: [PartnerGatewaySharedModule, ToolbarModule, ProjectionTableModule],
    declarations: [TabbedViewComponent],
    exports: [TabbedViewComponent]
})
export class IADCommonModule {}
