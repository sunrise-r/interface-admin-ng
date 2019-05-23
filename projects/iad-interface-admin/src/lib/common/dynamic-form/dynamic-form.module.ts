import { NgModule } from '@angular/core';

import { InputMaskModule } from 'primeng/inputmask';

import { DynamicFormComponent } from './dynamic-form.component';

import { FormatInputNamePipe } from './format-input-name.pipe';
import { DynamicFieldDirective } from './components/dynamic-field.directive';
import { FormDateComponent } from './components/form-date-component';
import { FormFileComponent } from './components/form-file-component';
import { FormInputComponent } from './components/form-input-component';
import { FormNumberComponent } from './components/form-number-component';
import { DropdownGroupComponent } from './components/dropdown-group.component';
import { FormDateTimeComponent } from './components/form-date-time-component';
import { FormTextareaComponent } from './components/form-textarea-component';
import {IadCommonModule} from '../iad-common.module';
import {IadSharedModule, IadPrimengModule} from 'iad-interface-admin/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormBooleanComponent} from './components/form-boolean-component';
import {FormMultiSelectComponent} from './components/form-multi-select.component';
import {FormSelectionDropdownComponent} from './components/form-selection-dropdown.component';
import {FormRichEditorComponent} from './components/form-rich-editor.component';

@NgModule({
    imports: [InputMaskModule, IadSharedModule, IadCommonModule, FontAwesomeModule, IadPrimengModule],
    declarations: [
        DynamicFormComponent,
        FormatInputNamePipe,
        DynamicFieldDirective,
        FormDateComponent,
        FormInputComponent,
        FormNumberComponent,
        DropdownGroupComponent,
        FormFileComponent,
        FormDateTimeComponent,
        FormTextareaComponent,
        FormBooleanComponent,
        FormMultiSelectComponent,
        FormSelectionDropdownComponent,
        FormRichEditorComponent
    ],
    entryComponents: [
        FormDateComponent,
        FormInputComponent,
        FormNumberComponent,
        DropdownGroupComponent,
        FormFileComponent,
        FormDateTimeComponent,
        FormTextareaComponent,
        FormBooleanComponent,
        FormMultiSelectComponent,
        FormSelectionDropdownComponent,
        FormRichEditorComponent
    ],
    exports: [DynamicFormComponent, FormatInputNamePipe, FontAwesomeModule]
})
export class DynamicFormModule {}
