import { NgModule } from '@angular/core';

import { TabbedViewComponent } from './tabbed-view/tabbed-view.component';
import {IadSharedModule} from '../shared/iad-shared.module';

@NgModule({
    imports: [IadSharedModule],
    declarations: [TabbedViewComponent],
    exports: [TabbedViewComponent]
})
export class IADCommonModule {}
