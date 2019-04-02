import { NgModule } from '@angular/core';

import {CustomizeModule} from '../customize/customize.module';
import {DynamicFormModule} from '../customize/dynamic-form/dynamic-form.module';

import {FormViewComponent} from './form-view/form-view.component';
import {IadSharedModule} from '../shared/iad-shared.module';



@NgModule({
    imports: [
        CustomizeModule,
        DynamicFormModule,
        IadSharedModule
    ],
    declarations: [FormViewComponent],
    exports: [FormViewComponent]
})
export class ProjectionFormModule {}
