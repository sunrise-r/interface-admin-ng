import { NgModule } from '@angular/core';

import { ProjectionFormComponent } from './projection-form/projection-form.component';
import { IadSharedModule } from 'iad-interface-admin/core';
import { DynamicFormModule } from 'iad-interface-admin/form';

@NgModule({
    imports: [IadSharedModule, DynamicFormModule],
    declarations: [ProjectionFormComponent],
    exports: [ProjectionFormComponent]
})
export class ProjectionFormModule {}
