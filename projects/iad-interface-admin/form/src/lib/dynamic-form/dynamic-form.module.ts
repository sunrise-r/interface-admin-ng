import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { IadPrimengModule, IadSharedModule } from 'iad-interface-admin/core';
import {IadFormCheckboxComponent} from './components/iad-form-checkbox.component';
import {IadFormMultiSelectComponent} from './components/iad-form-multi-select.component';
import {IadFormSelectionDropdownComponent} from './components/iad-form-selection-dropdown.component';
import {IadFormRichEditorComponent} from './components/iad-form-rich-editor.component';
import {IadFormChipsComponent} from './components/iad-form-chips.component';

@NgModule({
    imports: [CalendarModule, InputMaskModule, PanelModule, IadSharedModule, IadPrimengModule, FontAwesomeModule],
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
        IadFormTextareaComponent,
        IadFormCheckboxComponent,
        IadFormMultiSelectComponent,
        IadFormSelectionDropdownComponent,
        IadFormRichEditorComponent,
        IadFormChipsComponent
    ],
    entryComponents: [
        IadFormDateComponent,
        IadFormInputComponent,
        IadFormNumberComponent,
        IadDropdownGroupComponent,
        IadFormFileComponent,
        IadFormDateTimeComponent,
        IadFormTextareaComponent,
        IadFormCheckboxComponent,
        IadFormMultiSelectComponent,
        IadFormSelectionDropdownComponent,
        IadFormRichEditorComponent,
        IadFormChipsComponent
    ],
    exports: [DynamicFormComponent, FormatInputNamePipe, FileUploadComponent, DynamicFieldDirective]
})
export class DynamicFormModule {}
