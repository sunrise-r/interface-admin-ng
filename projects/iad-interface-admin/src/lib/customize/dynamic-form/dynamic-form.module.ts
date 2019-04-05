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
import {IadSharedModule} from '../../shared/iad-shared.module';
import {CustomizeModule} from '../customize.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [InputMaskModule, IadSharedModule, CustomizeModule, FontAwesomeModule],
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
        FormTextareaComponent
    ],
    entryComponents: [
        FormDateComponent,
        FormInputComponent,
        FormNumberComponent,
        DropdownGroupComponent,
        FormFileComponent,
        FormDateTimeComponent,
        FormTextareaComponent
    ],
    exports: [DynamicFormComponent, FormatInputNamePipe, FontAwesomeModule]
})
export class DynamicFormModule {}