import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';

import { DynamicFormModule } from '../common/dynamic-form/dynamic-form.module';

import { ProjectionFormComponent } from './projection-form/projection-form.component';

@NgModule({
    imports: [PartnerGatewaySharedModule, DynamicFormModule],
    declarations: [ProjectionFormComponent],
    exports: [ProjectionFormComponent]
})
export class ProjectionFormModule {}
