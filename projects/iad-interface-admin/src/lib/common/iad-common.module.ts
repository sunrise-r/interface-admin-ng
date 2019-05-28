import { NgModule } from '@angular/core';

import {CommonModule} from '@angular/common';
import {IadSharedModule, IadPrimengModule} from 'iad-interface-admin/core';

@NgModule({
    imports: [CommonModule, IadSharedModule, IadPrimengModule]
})
export class IadCommonModule {}
