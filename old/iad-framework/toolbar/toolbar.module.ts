import { NgModule } from '@angular/core';
import { PartnerGatewaySharedModule } from 'app/shared';

import { ToolbarActionDirective } from './toolbar-actions/toolbar-action.directive';

import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';
import { FilterBuilderModule } from '../filter-builder/filter-builder.module';

@NgModule({
    imports: [PartnerGatewaySharedModule, FilterBuilderModule],
    declarations: [ToolbarActionDirective, ToolbarActionsComponent],
    exports: [ToolbarActionsComponent]
})
export class ToolbarModule {}
