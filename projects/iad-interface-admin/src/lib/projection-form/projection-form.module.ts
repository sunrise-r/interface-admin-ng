import { NgModule } from '@angular/core';
import { DynamicFormModule } from 'iad-interface-admin/form';

import {IadCommonModule} from '../common/iad-common.module';

import {FormViewComponent} from './form-view/form-view.component';
import {IadSharedModule} from 'iad-interface-admin/core';

@NgModule({
    imports: [
        IadCommonModule,
        DynamicFormModule,
        IadSharedModule
    ],
    declarations: [FormViewComponent],
    exports: [FormViewComponent]
})
export class ProjectionFormModule {}
