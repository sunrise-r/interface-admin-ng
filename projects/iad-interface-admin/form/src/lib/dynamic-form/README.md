[InterfaceAdminNg](../../../../../../README.md) / [Usage](../../../../../../docs/2-usage-guide.md) / Form builder

# Form builder

## FormProjection field model

Field name | Type | Description
---------- | ---- | -----------
label | string | Перевод или переведённое название поля
name | string | Имя поля формы
type | string |  [Тип отображаемого филда](#input-types-with-models)
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
    
Note! 'datasourcePath' is named incorrect and should be renamed to dataSourcePath in IAD backend... But we have backward compatibility 

## Input types with Models

Input Code (for formProjection) | Input Model | Component
------------------------------- | ----------- | ---------
ProjectionReference | FormInputGroup | [Subform with collapse option](#1-iaddropdowngroupcomponent)
ZonedDateTime | DateInput | [PrimeNg calendar component](#2-iadformdatecomponent)
SplittedDateTime | DateTimeInput | [PrimeNg calendar component with time enabled](#3-iadformdatetimecomponent)
File | FileInput | [File upload input component](#4-iadformfilecomponent)
Hidden | HiddenInput | [HTML hidden input component](#5-iadforminputcomponent)
String | TextInput | [HTML text input component or PrimeNg maskInput component](#5-iadforminputcomponent)
StringTranslated | TextInputTranslated | [HTML text input component or PrimeNg maskInput component with translation enabled](#5-iadforminputcomponent)
BigDecimal | NumberInput | [Html number input component](#6-iadformnumbercomponent)
Integer | NumberInput | [Html number input component](#6-iadformnumbercomponent)
Text | TextareaInput | [Html textarea input component](#7-iadformtextareacomponent)
Boolean | BooleanInput | [PrimeNg checkbox component](#8-iadformcheckboxcomponent)
MultiSelect | MultiSelectInputModel | [PrimeNg multiSelect component](#9-iadformmultiselectcomponent)
Rich | RichEditorInput | [PrimeNg rich editor component (quill)](#10-iadformricheditorcomponent)
Dropdown | DropdownInputModel | [PrimeNg selection dropdown component](#11-iadformselectiondropdowncomponent)
Chips | ChipsInputModel | [PrimeNg chips component](#12-iadformchipscomponent)

## Default input components

### 1. IadFormGroupComponent
  
  Description: Subform with collapse option
  
  Selector: iad-form-group
  
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
      
  Projection field config properties:
      
      'plainReference': boolean; Allows to print subform inputs without dropdown in the same level as all other inputs  
    
### 2. IadFormDateComponent

  Description: PrimeNg calendar component
  
  Selector: iad-form-date
  
  Model: DateInput
    
### 3. IadFormDateTimeComponent

  Description: PrimeNg calendar component with time enabled
  
  Selector: iad-form-date-time
  
  Model: DateTimeInput
    
### 4. IadFormFileComponent

  Description: File upload input component. Note, if you want to send files to backend server you should send FormData object and not JSON. 
  
  Selector: iad-form-file
  
  Model: FileInput
    
### 5. IadFormInputComponent

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
    
### 6. IadFormNumberComponent

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
    
### 7. IadFormTextareaComponent

  Description: Html textarea input component
  
  Selector: iad-form-textarea
  
  Model: TextareaInput
  
      validators: {
          minLength?: string;
          maxLength?: string;
          required?: boolean;
      };

### 8. IadFormCheckboxComponent

  Description: PrimeNg checkbox component
  
  Selector: iad-form-checkbox
  
  Model: BooleanInput

### 9. IadFormRichEditorComponent

  Description: PrimeNg rich editor component (quill)
  
  Selector: iad-form-rich-editor
  
  Model: RichEditorInput
    
### 10. IadFormDropdownComponent

  Description: PrimeNg selection dropdown / multiSelect component
  
  Selector: iad-form-dropdown
  
  Model: DropdownInputModel
  
  Model2: MultiSelectInputModel (deprecated)
  
      values?: string[];
      valuesUrl?: string;
      translatePrefix?: string;
      
      valueField = 'value'; // field to use as value
      labelField = 'label'; // field to show label
      
      showClear= false; // single only
      
      multiple = false;
      
      maxSelectedLabels = 3; // multiple only
      showHeader = true; // multiple only

### 11. IadFormChipsComponent

  Description: PrimeNg chips component
  
  Selector: iad-form-chips
  
  Model: ChipsInputModel
  
      value?: string; // comma separated

### 12. IadFormAutoCompleteInputComponent

  Description: PrimeNg autocomplete component

  Selector: iad-form-auto-complete-input

  Model: AutoCompleteInput

      valuesUrl?: string;
      multiple?: boolean;

## Adding custom form input components 

1) Create new component inside your project, i.e. FormInputComponent

    ```typescript
       import { TranslateService } from '@ngx-translate/core';
       import { ValidationInput } from 'iad-interface-admin/form';   
 
       @Component({selector: 'app-my-new-input-class', template: '<input type="text" name="config.name" value="config.value">'})
       export class MyNewInputClassComponent extends ValidationInput implements OnInit, AfterViewInit {
            constructor(translateService: TranslateService, public el: ElementRef, public renderer: Renderer2) {
                super(translateService, el, renderer);
            }
       }
    ```

2) Declare MyNewInputClassComponent inside your module declarations and add him to entryComponents section

    ```typescript
        @NgModule({
            imports: [
                IadInterfaceAdminModule,
                IadPrimengModule,
                DynamicFormModule,
                IadProjectionFormModule
            ],
            declarations: [   
                FormViewComponent,
                MyNewInputClassComponent
            ],
            entryComponents: [
                MyNewInputClassComponent
            ],
            exports: [FormViewComponent]
        })
        export class FormsModule {}
    ```

3) Create an MyInputModel class for your component. To do that you have to extend FormInput class. One necessary parameter that you have to override is controlType. Set this property to some unique string, i.e. controlType = 'myInputCode';

    ```typescript
       import { FormInput } from 'iad-interface-admin/form';
       
       export class MyInputModel extends FormInput<any> {
           constructor(options: { key?: string; label?: string; column?: number; order?: number; dependencies?: string[] }) {
               super(options);
               this.controlType = 'text';
           }
       }
    ```

4) Create JavaScript object to associate your MyInputModel to your MyNewInputClassComponent. The keys in this object are controlTypes from your input models, i.e. {'myInputCode': MyNewInputClassComponent}

    ```typescript
       export const inputComponents = {
           text: MyNewInputClassComponent
       };
    ```

5) Create JavaScript object to associate formatter you have set in form projection field's 'fieldInputType' to your MyInputModel, i.e. {'MyFormatterFromFormProjectionInput': MyInputModel}

    ```typescript
       export const inputModels = {
           TextFormatter: MyInputModel
       };
    ```
    
6) While initialize <iad-projection-form...> inside your form wrapper component's template pass the Component-controlType association object to @Input() inputComponents, and formatter-inputModel association object to @Input inputModels

    ```html
       <iad-projection-form
        [formProjection]="formProjection"
        [inputComponents]="inputComponents"
        [inputModels]="inputModels"
        [rawFormData]="rawFormData"
        [serverError]="serverError"
        (formSubmit)="onFormSubmit($event)"
        (formCancel)="onFormCancel()"></iad-projection-form>
    ```
