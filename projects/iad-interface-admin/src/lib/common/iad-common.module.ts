import { NgModule } from '@angular/core';

import {TooltipNotifierComponent} from './tooltip-notifier/tooltip-notifier.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {CommonModule} from '@angular/common';
import {IadSharedModule} from '../shared/iad-shared.module';

@NgModule({
    imports: [CommonModule, IadSharedModule],
    declarations: [
        TooltipNotifierComponent,
        FileUploadComponent
    ],
    exports: [
        TooltipNotifierComponent,
        FileUploadComponent
    ]
})
export class IadCommonModule {}
