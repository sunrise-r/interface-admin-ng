import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { CustomizeModule, DynamicFormModule } from 'app/customize';

import { FormViewComponent } from './';

import { GridLookupModule } from '../grid-lookup';
import { OperationsModule } from '../operations';
import { ReferencesModule } from '../references';
import { CatalogTreeModule } from '../catalog-tree/catalog-tree.module';

import { FormLookupComponent } from './components/form-lookup-component';
import { FormGenderSelectionDropdownComponent } from './components/form-gender-selection-dropdown.component';

@NgModule({
    imports: [
        PartnerGatewaySharedModule,
        CustomizeModule,
        DynamicFormModule,
        OperationsModule,
        ReferencesModule,
        GridLookupModule,
        CatalogTreeModule
    ],
    declarations: [FormViewComponent, FormLookupComponent, FormGenderSelectionDropdownComponent],
    entryComponents: [FormLookupComponent, FormGenderSelectionDropdownComponent],
    exports: [FormViewComponent]
})
export class ProjectionFormModule {}
