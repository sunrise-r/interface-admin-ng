[InterfaceAdminNg](../../../README.md) / [Использование](../2-usage-guide.md) / Конструктор форм

# Конструктор форм

Конструктор форм это module Angular, который позволяет собирать сложные формы на основе подготовленной структуры данных. 

Для того, чтобы начать использовать конструктор форм, необходимо импортировать модуль angular и использовать его главный компонент внутри вашего компонента-обёртки:

 ```typescript
     @NgModule({
         imports: [
             DynamicFormModule.forRoot({
               i18nEnabled: false,
               defaultI18nLang: 'en',
               noi18nMessage: 'translation-not-found',
               referenceProjectionProvider: null,
               filterBuilderProvider: null
           })
         ]
     })
     export class FormsModule {}
 ```

Если вы уже используете глобальный модуль IAD (IadInterfaceAdminModule) в вашем root модуле, тогда просто добавьте импорт DynamicFormModule

 ```typescript
     @NgModule({
         imports: [
             DynamicFormModule
         ]
     })
     export class FormsModule {}
 ```

И в шаблоне вашего компонента:

 ```html
 <iad-dynamic-form
    [formInputGroup]="formInputGroup"
    [serverError]="serverError" 
    [context]="formMetaInformation"
    [isNestedForm]="false"
    [formTemplates]="formFooterTemplates"
    (formSubmit)="onFormSubmit($event)"
    (formCancel)="onFormCancel()"
    ></iad-dynamic-form>
 
```

### Доступные свойства (\@Input())

\@Input name | Type | Description
---------- | ---- | -----------
enablePerfectScroll | boolean | Включает использование плагина кастомного скроллбара
formInputGroup | [FormInputGroup](#структура-forminputgroup) | Инпуты формы (заполняются извне компонента).
serverError | HttpErrorResponse | Ошибка сервера для вывода её в форме
cancelBtnLabel | string | Лейбл для кнопки cancel в форме
cancelBtnStyleClass | string | Класс для стилизации кнопки cancel
submitBtnLabel | string | Лейбл для кнопки submit в форме
submitBtnStyleClass | string | Класс для стилизации кнопки submit 
context | any | Контекст построения формы (Обычно - данные для формы)
isNestedForm | boolean | Необходимо установить в true, если вам не нужно печатать теги <form></form> для вывода полей текущей формы. Например, если вы пытаетесь создать вложенную форму.
formTemplates | QueryList<PrimeTemplate> | Настраиваемые шаблоны формы. На момент написания документации поддерживается только шаблон "footer"
inputComponents | { [param: string]: any } | * Компоненты инпутов формы
| | | В виде объекта
| | | {
| | |     [inputKey: string]: any
| | | }

### События (\@Output())

\@Output name | Type | Description
---------- | ---- | -----------
formSubmit | any | событие сабмита формы. Angular неявно создаёт событие submit, которое можно использовать тоже, но тогда мы теряем контроль над событиями
formCancel | any | событие нажатия кнопки cancel
valueChanges | any | Событие изменения значения полей формы

## Структура FormInputGroup

Field name | Type | Description
---------- | ---- | -----------
controlType | string | Тип инпута. Согласно этому полю выбирается компонент для отображения инпута.
column | number | Номер колонки. Если больше 0, то пытаемся разделить стандартные бутстраповские 12 колонок на это число и получим ширину колонки.
key | string | поле name для инпута или группы инпутов (Для групп используется при формировании ответа со вложенными структурами данных)
label | string | Название инпута или группы инпутов (Для групп используется для показа заголовка группы)
order | number | Deprecated
dependencies | string[] | указывает, от каких инпутов формы зависит ввод данного инпута. Зависимые поля будут заблокированы (disabled) до тех пор, пока поля, от которых они зависят не будут заполнены
children | FormGroupChildColumn[] | Массив дочерних групп и инпутов
visible | boolean | // deprecated
translate | boolean | Флаг, устанавливающий необходимость перевода label с исползованием ngx-translate
collapsed | boolean | флаг, устанавливающий начальное состояние сворачиваемого блока в состояние collapsed (свёрнуто)
validators | object | Типы валидации: 
          . | . | {
          . | . | email?: boolean;
          . | . | required?: boolean;
          . | . | minLength?: string;
          . | . | maxLength?: string;
          . | . | };
collapsable? | boolean | Flag to set group collapse template to apply or not
properties? | any | Any additional properties for group

## Таблица сопоставлений значений fieldType, Модели настроек инпута и компонента для отображения инпута

Код инпута (fieldType из formProjection) | Модель настроек | Компонент для вывода
------------------------------- | ----------- | ---------
ProjectionReference | FormInputGroup | [Вложенная форма с возможностью сворачивания](#1-iaddropdowngroupcomponent)
ZonedDateTime | DateInput | [Компонент PrimeNg Calendar](#2-iadformdatecomponent)
SplittedDateTime | DateTimeInput | [Компонент PrimeNg calendar с включенным выбором времени](#3-iadformdatetimecomponent)
File | FileInput | [Компонент загрузки файла](#4-iadformfilecomponent)
Hidden | HiddenInput | [Компонент скрытого поля](#5-iadforminputcomponent)
String | TextInput | [Компонент простого текстовго инпута или PrimeNg maskInput](#5-iadforminputcomponent)
StringTranslated | TextInputTranslated | [HTML text input component or PrimeNg maskInput component with translation enabled](#5-iadforminputcomponent)
BigDecimal, Integer | NumberInput | [Компонент ввода числа](#6-iadformnumbercomponent)
Text | TextareaInput | [Компонент textarea](#7-iadformtextareacomponent)
Boolean | BooleanInput | [Компонент PrimeNg checkbox](#8-iadformcheckboxcomponent)
MultiSelect | MultiSelectInputModel | [Компонент множественного выбора select PrimeNg multiSelect](#9-iadformmultiselectcomponent)
Rich | RichEditorInput | [Компонент редактора PrimeNg rich (quill)](#10-iadformricheditorcomponent)
Dropdown | DropdownInputModel | [Компонент выбора select PrimeNg dropdown](#11-iadformselectiondropdowncomponent)
Chips | ChipsInputModel | [Компонент PrimeNg chips](#12-iadformchipscomponent)

## Компоненты для ввода данных в форме, доступные "из коробки"

### 1. IadFormGroupComponent
  
  Description: Subform with collapse option
  
  Selector: iad-form-group
  
  Model: [FormInputGroup](#forminputgroup-structure)
      
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
