import { NgModule } from '@angular/core';

import { IadSharedModule } from '../../../../src/lib/shared/iad-shared.module';

import { TabbedViewComponent } from './tabbed-view/tabbed-view.component';

@NgModule({
    imports: [IadSharedModule],
    declarations: [TabbedViewComponent],
    exports: [TabbedViewComponent]
})
export class IADCommonModule {}
