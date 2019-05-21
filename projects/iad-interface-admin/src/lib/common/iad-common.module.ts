import { NgModule } from '@angular/core';

import {PrimengCustomizeModule} from './primeng-customize/primeng-customize.module';
import {TooltipNotifierComponent} from './tooltip-notifier/tooltip-notifier.component';
import {ImageComponent} from './image/image.component';
import {SecuredImageComponent} from './image/secured-image.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {CheckboxListComponent} from './checkbox-list/checkbox-list.component';
import {CommonModule} from '@angular/common';
import {IadSharedModule} from '../shared/iad-shared.module';

@NgModule({
    imports: [PrimengCustomizeModule, CommonModule, IadSharedModule],
    declarations: [
        TooltipNotifierComponent,
        ImageComponent,
        SecuredImageComponent,
        FileUploadComponent,
        CheckboxListComponent
    ],
    exports: [
        PrimengCustomizeModule,
        TooltipNotifierComponent,
        ImageComponent,
        SecuredImageComponent,
        FileUploadComponent,
        CheckboxListComponent
    ]
})
export class IadCommonModule {}
