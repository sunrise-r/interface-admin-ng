import { NgModule } from '@angular/core';
import { IadSharedModule } from 'iad-interface-admin/core';

import { IadToolbarActionDirective } from './iad-toolbar-action.directive';
import { IadToolbarActionsComponent } from './iad-toolbar-actions.component';

@NgModule({
    imports: [IadSharedModule],
    declarations: [IadToolbarActionDirective, IadToolbarActionsComponent],
    exports: [IadToolbarActionsComponent]
})
export class IadToolbarModule {}
