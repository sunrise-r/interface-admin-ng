import { NgModule } from '@angular/core';

import { ToolbarActionDirective } from './toolbar-actions/toolbar-action.directive';

import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';
import { FilterBuilderModule } from '../filter-builder/filter-builder.module';
import {IadSharedModule} from 'iad-interface-admin/core';

@NgModule({
    imports: [IadSharedModule, FilterBuilderModule],
    declarations: [ToolbarActionDirective, ToolbarActionsComponent],
    exports: [ToolbarActionsComponent]
})
export class ToolbarModule {}
