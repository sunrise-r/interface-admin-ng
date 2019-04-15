import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { ToolbarModule } from './toolbar';

import { IADDataTableModule } from './data-table/iad-datatable.module';
import { ProjectionFormModule } from './projection-form/projection-form.module';

import { IADCommonModule } from './common/iad-common.module';

@NgModule({
    imports: [IADCommonModule, PartnerGatewaySharedModule, ToolbarModule, IADDataTableModule],
    exports: [IADCommonModule, ProjectionFormModule]
})
export class IADFrameworkModule {}
