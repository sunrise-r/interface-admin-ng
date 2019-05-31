import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IadInterfaceAdminModule } from 'iad-interface-admin';
import { IadReferenceProjectionProviderService } from 'iad-interface-admin/form';

import { DataComponent } from './data.component';
import { RouterModule } from '@angular/router';
import { dataRoutes } from './data.route';
import { GridComponent } from './grid/grid.component';
import { IadSharedModule } from '../shared';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ReferenceProjectionProviderService } from './services/reference-projection-provider.service';

@NgModule({
    declarations: [DataComponent, GridComponent, HomeComponent, FormComponent],
    imports: [
        IadSharedModule,
        RouterModule.forChild(dataRoutes),
        IadInterfaceAdminModule.forChild({
            i18nEnabled: true,
            defaultI18nLang: 'ru',
            noi18nMessage: 'translation-not-found',
            referenceProjectionProvider: { provide: IadReferenceProjectionProviderService, useClass: ReferenceProjectionProviderService }
        })
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DataModule {}
