import { NgModule } from '@angular/core';
import { AdminScrollModule, PartnerGatewaySharedModule } from 'app/shared';
import {
    PrimengCustomizeModule,
    TooltipNotifierComponent,
    DocumentResolutionsComponent,
    ImageComponent,
    SecuredImageComponent,
    EmployeeAutocompleteComponent,
    FileUploadComponent,
    CheckboxListComponent
} from './';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
    imports: [PartnerGatewaySharedModule, PrimengCustomizeModule, AdminScrollModule],
    declarations: [
        TooltipNotifierComponent,
        DocumentResolutionsComponent,
        DocumentResolutionsComponent,
        EmployeeAutocompleteComponent,
        ImageComponent,
        SecuredImageComponent,
        FileUploadComponent,
        CheckboxListComponent,
        ProfileCardComponent,
        GoogleMapComponent
    ],
    exports: [
        PrimengCustomizeModule,
        TooltipNotifierComponent,
        DocumentResolutionsComponent,
        EmployeeAutocompleteComponent,
        ImageComponent,
        SecuredImageComponent,
        FileUploadComponent,
        CheckboxListComponent,
        ProfileCardComponent,
        GoogleMapComponent
    ]
})
export class CustomizeModule {}
