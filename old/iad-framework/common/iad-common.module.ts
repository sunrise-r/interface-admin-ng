import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';

import { TabbedViewComponent } from './tabbed-view/tabbed-view.component';

@NgModule({
    imports: [PartnerGatewaySharedModule],
    declarations: [TabbedViewComponent],
    exports: [TabbedViewComponent]
})
export class IADCommonModule {}
