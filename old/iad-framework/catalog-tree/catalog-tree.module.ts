import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { CatalogTreeBreadcrumbsComponent } from './catalog-tree-breadcrumbs.component';
import { CatalogTreeHierarchyComponent } from './catalog-tree-hierarchy.component';
import { IADCommonModule } from '../common/iad-common.module';
import { CatalogTreeHeadingHamburgerComponent } from './catalog-tree-heading-hamburger.component';

@NgModule({
    imports: [PartnerGatewaySharedModule, IADCommonModule],
    declarations: [CatalogTreeBreadcrumbsComponent, CatalogTreeHierarchyComponent, CatalogTreeHeadingHamburgerComponent],
    exports: [CatalogTreeBreadcrumbsComponent, CatalogTreeHierarchyComponent, CatalogTreeHeadingHamburgerComponent],
    providers: []
})
export class CatalogTreeModule {}
