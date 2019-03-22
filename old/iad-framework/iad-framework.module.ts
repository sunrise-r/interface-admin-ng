import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { ToolbarModule } from './toolbar';

import { IADDataTableModule } from './data-table';
import { DataPreviewModule } from './data-preview';
import { OperationsModule } from './operations';
import { ReferencesModule } from './references';
import { ProjectionFormModule } from './projection-form';

import { IADCommonModule } from './';

@NgModule({
    imports: [
        IADCommonModule,
        PartnerGatewaySharedModule,
        ToolbarModule,
        IADDataTableModule,
        DataPreviewModule,
        OperationsModule,
        ReferencesModule
    ],
    exports: [IADCommonModule, ProjectionFormModule]
})
export class IADFrameworkModule {}
