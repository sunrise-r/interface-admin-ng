[InterfaceAdminNg](../../../../../../README.md) / [Usage](../../../../../../docs/2-usage-guide.md) / Form builder

# Form builder

## FormProjection field model

Field name | Type | Description
---------- | ---- | -----------
label | string | Перевод или переведённое название поля
name | string | Имя поля формы
type | string |  Тип отображаемого филда. (напр. DateTime, Date, String, Lookup, Entity, List и тд)
column? | number |  Номер колонки дял показа в форме (в форме поля могут быть раскиданы по колонкам)
fieldInputType? | string |  DISABLED/READONLY/Null
defaultValue? | string |  Знкачение по умолчанию, заданное в проекции
presentationCode? | string | Код представления для запроса мета-информации, содержащей проекции Lookup или Reference.
lookupSourceProjectionCode? | string | Код лист-проекции для отображения ресурсов Lookup (список, с предложениями для выбора в Lookup)
lookupViewProjectionCode? | string | Код лист-проекции для отображения данных в Lookup
referenceProjectionCode? | string | Код форм-проекции, которую нужно отобразить как вложенную группу полей данной формы
translate? | boolean | Производится перевод по метке
inputMask? | string | Маска ввода для плагинов ввода по маске
validationTypes? | object | Типы валидации: 
. | . | {
. | . | email?: boolean;
. | . | required?: boolean;
. | . | minLength?: string;
. | . | maxLength?: string;
. | . | };
valueField? | string | Название поля, по которому следует определять значение этого поля. Было сделаано для Lookup, но может быть применено к другим полям
dataSourcePath? | string | Путь к данным, разделённый точками для заполнения поля значениями по умолчанию. Было сделаано для Lookup, но может быть применено к другим полям
properties? | object | key=>value с кастомными свойствами 

## Usage in formProjection
    fields: [
      {
        'validationTypes': {'email': false, 'required': false},
        'type': 'Hidden',
        'name': 'hiddenStatus',
        'label': 'Скрытый статус',
        'defaultValue': 'SuperHiddenStatus',
        'datasourcePath': 'properties.status.hiddenStatusValue'
        'column': 0,
        'translate': true,
        'properties': {}
      }
    ],...
    

## Input types with Models

Input Code (for formProjection) | Input Model
------------ | -------------
BigDecimal | NumberInput
Boolean|BooleanInput
MultiSelect | MultiSelectInputModel
Dropdown | DropdownInputModel
Rich | RichEditorInput
Integer | NumberInput
ZonedDateTime | DateInput
Chips | ChipsInputModel
String | TextInput
StringTranslated | TextInputTranslated
Hidden | HiddenInput
File | FileInput
SplittedDateTime | DateTimeInput
Text | TextareaInput

## Default input components

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
