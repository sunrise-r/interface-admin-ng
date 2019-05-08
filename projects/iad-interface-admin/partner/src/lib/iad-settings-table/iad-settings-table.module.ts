import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/shared';

import { IADDataTableModule } from '../data-table/iad-datatable.module';

import { IADSettingsTableComponent } from './iad-settings-table.component';
import {IadSharedModule} from '../shared/iad-shared.module';

@NgModule({
    imports: [IadSharedModule, SharedModule, IADDataTableModule],
    declarations: [IADSettingsTableComponent],
    exports: [IADDataTableModule, IADSettingsTableComponent]
})
export class IadSettingsTableModule {}
