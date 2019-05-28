import { NgModule } from '@angular/core';
import { IadSharedModule } from 'iad-interface-admin/core';

import { IADDataTableModule } from './data-table/iad-datatable.module';
import { ProjectionFormModule } from './projection-form/projection-form.module';
import { IADCommonModule } from './common/iad-common.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
    imports: [IADCommonModule, IadSharedModule, ToolbarModule, IADDataTableModule],
    exports: [IADCommonModule, ProjectionFormModule]
})
export class IADFrameworkModule {}
