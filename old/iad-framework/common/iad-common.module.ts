import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';

import { HeadingHamburgerComponent, HamburgerTemplateDirective } from './heading-hamburger/heading-hamburger.component';
import { TabbedViewComponent } from './tabbed-view/tabbed-view.component';

@NgModule({
    imports: [PartnerGatewaySharedModule],
    declarations: [TabbedViewComponent, HeadingHamburgerComponent, HamburgerTemplateDirective],
    exports: [TabbedViewComponent, HeadingHamburgerComponent, HamburgerTemplateDirective]
})
export class IADCommonModule {}
