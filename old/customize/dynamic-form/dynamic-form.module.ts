import { NgModule } from '@angular/core';

import { PartnerGatewaySharedModule } from 'app/shared';
import { CustomizeModule } from '../customize.module';
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

@NgModule({
    imports: [InputMaskModule, PartnerGatewaySharedModule, CustomizeModule],
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
    exports: [DynamicFormComponent, FormatInputNamePipe]
})
export class DynamicFormModule {}
