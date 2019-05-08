import { NgModule } from '@angular/core';

import { IadSharedModule } from '../../../src/lib/shared/iad-shared.module';
import { ToolbarModule } from './toolbar';

import { IADDataTableModule } from './data-table/iad-datatable.module';
import { ProjectionFormModule } from './projection-form/projection-form.module';
import { IADCommonModule } from './common/iad-common.module';

@NgModule({
    imports: [IADCommonModule, IadSharedModule, ToolbarModule, IADDataTableModule],
    exports: [IADCommonModule, ProjectionFormModule]
})
export class IADFrameworkModule {}
