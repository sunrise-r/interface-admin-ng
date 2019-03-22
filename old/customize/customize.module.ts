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
        CheckboxListComponent
    ],
    exports: [
        PrimengCustomizeModule,
        TooltipNotifierComponent,
        DocumentResolutionsComponent,
        EmployeeAutocompleteComponent,
        ImageComponent,
        SecuredImageComponent,
        FileUploadComponent,
        CheckboxListComponent
    ]
})
export class CustomizeModule {}
