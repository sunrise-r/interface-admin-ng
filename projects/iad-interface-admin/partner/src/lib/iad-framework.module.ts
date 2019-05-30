import { NgModule } from '@angular/core';
import { IadSharedModule } from 'iad-interface-admin/core';
import { ProjectionFormPartnerModule } from 'iad-interface-admin/form';

import { IADDataTableModule } from './data-table/iad-datatable.module';
import { IADCommonModule } from './common/iad-common.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
    imports: [IADCommonModule, IadSharedModule, ToolbarModule, IADDataTableModule],
    exports: [IADCommonModule, ProjectionFormPartnerModule]
})
export class IADFrameworkModule {}
