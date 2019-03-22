import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/shared';
import { PartnerGatewaySharedModule } from 'app/shared';
import { IADDataTableModule } from '../data-table';

import { IADSettingsTableComponent } from './';

@NgModule({
    imports: [PartnerGatewaySharedModule, SharedModule, IADDataTableModule],
    declarations: [IADSettingsTableComponent],
    exports: [IADDataTableModule, IADSettingsTableComponent]
})
export class IadSettingsTableModule {}
