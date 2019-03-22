import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { CustomizeModule } from 'app/customize';
import { ProjectionTableModule } from '../projection-table';
import { IADCommonModule } from '../common';

import { ReferencesComponent } from './';

@NgModule({
    imports: [PartnerGatewaySharedModule, ProjectionTableModule, CustomizeModule, IADCommonModule],
    declarations: [ReferencesComponent],
    exports: [ReferencesComponent]
})
export class ReferencesModule {}
