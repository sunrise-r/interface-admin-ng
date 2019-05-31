import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IadInterfaceAdminModule } from 'iad-interface-admin';

import { DataComponent } from './data.component';
import { RouterModule } from '@angular/router';
import { dataRoutes } from './data.route';
import { GridComponent } from './grid/grid.component';
import { IadSharedModule } from '../shared';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';

@NgModule({
    declarations: [DataComponent, GridComponent, HomeComponent, FormComponent],
    imports: [
        IadSharedModule,
        RouterModule.forChild(dataRoutes),
        IadInterfaceAdminModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DataModule {}
