#Form builder

##Default input components

1. IadDropdownGroupComponent
  
    Description: Subform with collapse option
    
    Selector: iad-dropdown-group
    
    Model: FormInputGroup
    
        column: number;
        key: string;
        label: string;
        order: number;
        dependencies: string[];
        children: FormGroupChildColumn[];
        visible: boolean;
        translate: boolean;
        collapsed = true;
    
2. IadFormDateComponent

    Description: PrimeNg calendar component
    
    Selector: iad-form-date
    
    Model: DateInput
    
3. IadFormDateTimeComponent

    Description: PrimeNg calendar component with time enabled
    
    Selector: iad-form-date-time
    
    Model: DateTimeInput
    
4. IadFormFileComponent

    Description: File upload input component. Note, if you want to send files to backend server you should send FormData object and not JSON. 
    
    Selector: iad-form-file
    
    Model: FileInput
    
5. IadFormInputComponent

    Description: Relative to configuration either html text input component or PrimeNg maskInput component
    
    Selector: iad-form-input
    
    Model: TextInput
      
        validators: {
            minLength?: string;
            maxLength?: string;
            required?: boolean;
            email?: boolean;
        };
        type: string;
        inputMask: string;
        
    Model: HiddenInput
    
    Model: TextInputTranslated 
    
6. IadFormNumberComponent

    Description: Html number input component
    
    Selector: iad-form-number
    
    Model: NumberInput
    
        validators: {
            min?: string;
            max?: string;
            required?: boolean;
        };
        type: string;
        step: number;
    
7. IadFormTextareaComponent

    Description: Html textarea input component
    
    Selector: iad-form-textarea
    
    Model: TextareaInput
    
        validators: {
            minLength?: string;
            maxLength?: string;
            required?: boolean;
        };

8. IadFormCheckboxComponent

    Description: PrimeNg checkbox component
    
    Selector: iad-form-checkbox
    
    Model: BooleanInput
    
9. IadFormMultiSelectComponent

    Description: PrimeNg multiSelect component
    
    Selector: iad-form-multi-select
    
    Model: MultiSelectInputModel
    
        values: string[];
        maxSelectedLabels = 3;
        showHeader = true;
        translatePrefix: string;

10. IadFormRichEditorComponent

    Description: PrimeNg rich editor component (quill)
    
    Selector: iad-form-rich-editor
    
    Model: RichEditorInput
    
11. IadFormSelectionDropdownComponent

    Description: PrimeNg rich editor component (quill)
    
    Selector: iad-form-rich-editor
    
    Model: DropdownInputModel
    
        values?: string[];
        translatePrefix?: string;

12. IadFormChipsComponent

    Description: PrimeNg chips component
    
    Selector: iad-form-chips
    
    Model: ChipsInputModel
    
        value?: string; // coma separated
