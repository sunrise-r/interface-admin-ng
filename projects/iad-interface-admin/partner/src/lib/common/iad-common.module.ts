import { NgModule } from '@angular/core';
import { IadSharedModule } from 'iad-interface-admin/core';

import { TabbedViewComponent } from './tabbed-view/tabbed-view.component';

@NgModule({
    imports: [IadSharedModule],
    declarations: [TabbedViewComponent],
    exports: [TabbedViewComponent]
})
export class IADCommonModule {}
