import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { CatalogTreeBreadcrumbsComponent } from './catalog-tree-breadcrumbs.component';

@NgModule({
    imports: [PartnerGatewaySharedModule],
    exports: [CatalogTreeBreadcrumbsComponent],
    declarations: [CatalogTreeBreadcrumbsComponent],
    providers: []
})
export class CatalogTreeModule {}
