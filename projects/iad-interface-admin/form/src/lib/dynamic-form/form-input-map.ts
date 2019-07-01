// config
import { TextInput } from './inputs/text-input.model';
import { NumberInput } from './inputs/number-input.model';
import { DateInput } from './inputs/date-input.model';
import { DateTimeInput } from './inputs/date-time-input.model';
import { HiddenInput } from './inputs/hidden-input.model';
import { FileInput } from './inputs/file-input.model';
import { TextareaInput } from './inputs/textarea-input.model';
import { ChipsInputModel } from './inputs/chips-input.model';

// components
import { IadFormInputComponent } from './components/iad-form-input.component';
import { IadFormDateComponent } from './components/iad-form-date.component';
import { IadFormNumberComponent } from './components/iad-form-number.component';
import { IadFormFileComponent } from './components/iad-form-file.component';
import { IadDropdownGroupComponent } from './components/iad-dropdown-group.component';
import { IadFormDateTimeComponent } from './components/iad-form-date-time.component';
import { IadFormTextareaComponent } from './components/iad-form-textarea.component';
import { IadFormRichEditorComponent} from './components/iad-form-rich-editor.component';
import { IadFormCheckboxComponent } from './components/iad-form-checkbox.component';
import { IadFormMultiSelectComponent } from './components/iad-form-multi-select.component';
import { IadFormSelectionDropdownComponent } from './components/iad-form-selection-dropdown.component';
import { BooleanInput } from './inputs/boolean-input.model';
import { MultiSelectInputModel } from './inputs/multi-select-input.model';
import { DropdownInputModel } from './inputs/dropdown-input.model';
import { RichEditorInput } from './inputs/rich-editor-input.model';
import { TextInputTranslated } from './inputs/text-input-translated.model';
import { IadFormChipsComponent } from './components/iad-form-chips.component';
import { IadFormTranslateInputComponent } from './components/iad-form-translate-input.component';
import {IadFormAutoCompleteInputComponent} from './components/iad-form-auto-complete-input.component';
import {AutoCompleteInput} from './inputs/auto-complete-input.model';

export const components = {
    textbox: IadFormInputComponent,
    date: IadFormDateComponent,
    file: IadFormFileComponent,
    number: IadFormNumberComponent,
    dropDownGroup: IadDropdownGroupComponent,
    hidden: IadFormInputComponent,
    datetime: IadFormDateTimeComponent,
    textarea: IadFormTextareaComponent,
    rich: IadFormRichEditorComponent,
    boolean: IadFormCheckboxComponent,
    multiSelect: IadFormMultiSelectComponent,
    dropdown: IadFormSelectionDropdownComponent,
    chips: IadFormChipsComponent,
    translateValue: IadFormTranslateInputComponent,
    autoComplete: IadFormAutoCompleteInputComponent
};

export const inputModels = {
    BigDecimal: NumberInput,
    Boolean: BooleanInput,
    MultiSelect: MultiSelectInputModel,
    Dropdown: DropdownInputModel,
    Rich: RichEditorInput,
    Integer: NumberInput,
    ZonedDateTime: DateInput,
    Chips: ChipsInputModel,
    String: TextInput,
    StringTranslated: TextInputTranslated,
    Hidden: HiddenInput,
    File: FileInput,
    SplittedDateTime: DateTimeInput,
    Text: TextareaInput,
    AutoComplete: AutoCompleteInput
};
