import { NgModule } from '@angular/core';
import { IadSharedModule } from 'iad-interface-admin/core';

import { IADDataTableModule } from './data-table/iad-datatable.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
    imports: [IadSharedModule, ToolbarModule, IADDataTableModule]
})
export class IADFrameworkModule {}
