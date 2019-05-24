import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/shared';
import { IadSharedModule } from 'iad-interface-admin/core';

import { IADDataTableModule } from '../data-table/iad-datatable.module';

import { IADSettingsTableComponent } from './iad-settings-table.component';

@NgModule({
    imports: [IadSharedModule, SharedModule, IADDataTableModule],
    declarations: [IADSettingsTableComponent],
    exports: [IADDataTableModule, IADSettingsTableComponent]
})
export class IadSettingsTableModule {}
