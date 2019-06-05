import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/shared';
import { IadSharedModule } from 'iad-interface-admin/core';
import { IadBaseGridModule } from 'iad-interface-admin';

import { IADSettingsTableComponent } from './iad-settings-table.component';

@NgModule({
    imports: [IadSharedModule, SharedModule, IadBaseGridModule],
    declarations: [IADSettingsTableComponent],
    exports: [IadBaseGridModule, IADSettingsTableComponent]
})
export class IadSettingsTableModule {}
