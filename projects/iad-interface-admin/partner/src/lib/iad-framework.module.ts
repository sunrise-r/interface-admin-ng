import { NgModule } from '@angular/core';
import { IadSharedModule } from 'iad-interface-admin/core';
import { IadBaseGridModule } from 'iad-interface-admin';

import { ToolbarModule } from 'iad-interface-admin';

@NgModule({
    imports: [IadSharedModule, ToolbarModule, IadBaseGridModule]
})
export class IADFrameworkModule {}
