import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { CustomizeModule } from 'app/customize';

import { ToolbarModule } from '../toolbar';
import { ProjectionTableModule } from '../projection-table';

import { OperationsModule } from '../operations';
import { ReferencesModule } from '../references';

import { GridLookupSourceComponent, GridLookupViewComponent } from './';

@NgModule({
    imports: [PartnerGatewaySharedModule, CustomizeModule, ProjectionTableModule, ToolbarModule, OperationsModule, ReferencesModule],
    declarations: [GridLookupViewComponent, GridLookupSourceComponent],
    exports: [GridLookupViewComponent, GridLookupSourceComponent]
})
export class GridLookupModule {}
