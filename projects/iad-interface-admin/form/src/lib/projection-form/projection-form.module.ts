import { NgModule } from '@angular/core';

import {FormViewComponent} from './form-view/form-view.component';
import {IadSharedModule} from 'iad-interface-admin/core';
import {IadRouterHistoryService} from './public-services/iad-router-history.service';
import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';

@NgModule({
    imports: [
        DynamicFormModule,
        IadSharedModule
    ],
    declarations: [FormViewComponent],
    exports: [FormViewComponent]
})
export class ProjectionFormModule {
  constructor(iadRouterHistoryService: IadRouterHistoryService) {}
}
