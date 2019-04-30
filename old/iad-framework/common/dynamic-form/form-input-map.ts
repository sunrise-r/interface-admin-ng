// config
import { TextInput } from './inputs/text-input.model';
import { NumberInput } from './inputs/number-input.model';
import { DateInput } from './inputs/date-input.model';
import { DateTimeInput } from './inputs/date-time-input.model';
import { HiddenInput } from './inputs/hidden-input.model';
import { FileInput } from './inputs/file-input.model';
import { TextareaInput } from './inputs/textarea-input.model';

// components
import { IadFormInputComponent } from './components/iad-form-input.component';
import { IadFormDateComponent } from './components/iad-form-date.component';
import { IadFormNumberComponent } from './components/iad-form-number.component';
import { IadFormFileComponent } from './components/iad-form-file.component';
import { IadDropdownGroupComponent } from './components/iad-dropdown-group.component';
import { IadFormDateTimeComponent } from './components/iad-form-date-time.component';
import { IadFormTextareaComponent } from './components/iad-form-textarea.component';

export const components = {
    textbox: IadFormInputComponent,
    date: IadFormDateComponent,
    file: IadFormFileComponent,
    number: IadFormNumberComponent,
    dropDownGroup: IadDropdownGroupComponent,
    hidden: IadFormInputComponent,
    datetime: IadFormDateTimeComponent,
    textarea: IadFormTextareaComponent
};

export const inputModels = {
    BigDecimal: NumberInput,
    Boolean: TextInput, // Text until checkbox/radio
    Integer: NumberInput,
    ZonedDateTime: DateInput,
    String: TextInput,
    Hidden: HiddenInput,
    File: FileInput,
    SplittedDateTime: DateTimeInput,
    Text: TextareaInput
};
