import { NgModule } from '@angular/core';
import { IadSharedModule } from 'iad-interface-admin/core';

import { ProjectionFormComponent } from './projection-form/projection-form.component';
import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';

@NgModule({
    imports: [IadSharedModule, DynamicFormModule],
    declarations: [ProjectionFormComponent],
    exports: [ProjectionFormComponent]
})
export class ProjectionFormPartnerModule {}
