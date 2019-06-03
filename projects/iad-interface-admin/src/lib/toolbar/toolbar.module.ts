import { NgModule } from '@angular/core';
import { IadSharedModule } from 'iad-interface-admin/core';

import { ToolbarActionDirective } from './toolbar-action.directive';
import { ToolbarActionsComponent } from './toolbar-actions.component';

@NgModule({
    imports: [IadSharedModule],
    declarations: [ToolbarActionDirective, ToolbarActionsComponent],
    exports: [ToolbarActionsComponent]
})
export class ToolbarModule {}
