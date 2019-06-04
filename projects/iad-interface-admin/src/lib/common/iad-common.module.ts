import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IadSharedModule, IadPrimengModule } from 'iad-interface-admin/core';
import { TabbedViewComponent } from './tabbed-view/tabbed-view.component';

@NgModule({
    imports: [CommonModule, IadSharedModule, IadPrimengModule],
    declarations: [TabbedViewComponent],
    exports: [TabbedViewComponent]
})
export class IadCommonModule {}
