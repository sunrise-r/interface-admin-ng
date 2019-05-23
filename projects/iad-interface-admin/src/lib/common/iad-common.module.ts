import { NgModule } from '@angular/core';

import {TooltipNotifierComponent} from './tooltip-notifier/tooltip-notifier.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {CommonModule} from '@angular/common';
import {IadSharedModule, IadPrimengModule} from 'iad-interface-admin/core';

@NgModule({
    imports: [CommonModule, IadSharedModule, IadPrimengModule],
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
