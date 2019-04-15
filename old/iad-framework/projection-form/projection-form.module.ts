import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { CustomizeModule, DynamicFormModule } from 'app/customize';

import { ProjectionFormComponent } from './projection-form/projection-form.component';

import { CatalogTreeModule } from '../catalog-tree/catalog-tree.module';

import { OperationsModule } from 'app/operations';
import { ReferencesModule } from 'app/references';

@NgModule({
    imports: [PartnerGatewaySharedModule, CustomizeModule, DynamicFormModule, OperationsModule, ReferencesModule, CatalogTreeModule],
    declarations: [ProjectionFormComponent],
    exports: [ProjectionFormComponent]
})
export class ProjectionFormModule {}
