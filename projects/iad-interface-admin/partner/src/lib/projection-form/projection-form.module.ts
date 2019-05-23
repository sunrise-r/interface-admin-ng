import { NgModule } from '@angular/core';

import { DynamicFormModule } from '../common/dynamic-form/dynamic-form.module';

import { ProjectionFormComponent } from './projection-form/projection-form.component';
import {IadSharedModule} from '../shared/iad-shared.module';

@NgModule({
    imports: [IadSharedModule, DynamicFormModule],
    declarations: [ProjectionFormComponent],
    exports: [ProjectionFormComponent]
})
export class ProjectionFormModule {}
