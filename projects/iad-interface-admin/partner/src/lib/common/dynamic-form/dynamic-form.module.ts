import { NgModule } from '@angular/core';

import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule, PanelModule } from 'primeng/primeng';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field.directive';

import { FormatInputNamePipe } from './format-input-name.pipe';
import { IadFormDateComponent } from './components/iad-form-date.component';
import { IadFormFileComponent } from './components/iad-form-file.component';
import { IadFormInputComponent } from './components/iad-form-input.component';
import { IadFormNumberComponent } from './components/iad-form-number.component';
import { IadDropdownGroupComponent } from './components/iad-dropdown-group.component';
import { IadFormDateTimeComponent } from './components/iad-form-date-time.component';
import { IadFormTextareaComponent } from './components/iad-form-textarea.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {IadSharedModule} from 'iad-interface-admin/core';

@NgModule({
    imports: [CalendarModule, InputMaskModule, PanelModule, IadSharedModule],
    declarations: [
        FileUploadComponent,
        DynamicFormComponent,
        FormatInputNamePipe,
        DynamicFieldDirective,
        IadFormDateComponent,
        IadFormInputComponent,
        IadFormNumberComponent,
        IadDropdownGroupComponent,
        IadFormFileComponent,
        IadFormDateTimeComponent,
        IadFormTextareaComponent
    ],
    entryComponents: [
        IadFormDateComponent,
        IadFormInputComponent,
        IadFormNumberComponent,
        IadDropdownGroupComponent,
        IadFormFileComponent,
        IadFormDateTimeComponent,
        IadFormTextareaComponent
    ],
    exports: [DynamicFormComponent, FormatInputNamePipe, FileUploadComponent, DynamicFieldDirective]
})
export class DynamicFormModule {}
