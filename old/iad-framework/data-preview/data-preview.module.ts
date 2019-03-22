import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule, AdminScrollModule } from 'app/shared';
import { CustomizeModule } from 'app/customize';

import { DataPreviewComponent } from './data-preview.component';
import { OperationPreviewComponent } from './operation-preview/operation-preview.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
import { ResolutionPreviewComponent } from './resolution-preview/resolution-preview.component';

@NgModule({
    imports: [PartnerGatewaySharedModule, CustomizeModule, AdminScrollModule],
    declarations: [DataPreviewComponent, OperationPreviewComponent, DocumentPreviewComponent, ResolutionPreviewComponent],
    entryComponents: [DataPreviewComponent],
    exports: [DataPreviewComponent]
})
export class DataPreviewModule {}
