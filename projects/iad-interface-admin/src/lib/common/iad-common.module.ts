import { NgModule } from '@angular/core';

import {PrimengCustomizeModule} from './primeng-customize/primeng-customize.module';
import {TooltipNotifierComponent} from './tooltip-notifier/tooltip-notifier.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {CommonModule} from '@angular/common';
import {IadSharedModule} from '../shared/iad-shared.module';

@NgModule({
    imports: [PrimengCustomizeModule, CommonModule, IadSharedModule],
    declarations: [
        TooltipNotifierComponent,
        FileUploadComponent
    ],
    exports: [
        PrimengCustomizeModule,
        TooltipNotifierComponent,
        FileUploadComponent
    ]
})
export class IadCommonModule {}
