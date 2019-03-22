import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { CustomizeModule } from 'app/customize';

import { ProjectionTableModule } from '../projection-table';
import { IADCommonModule } from '../common';

import { OperationsComponent } from './';

@NgModule({
    imports: [PartnerGatewaySharedModule, ProjectionTableModule, CustomizeModule, IADCommonModule],
    declarations: [OperationsComponent],
    exports: [OperationsComponent]
})
export class OperationsModule {}
