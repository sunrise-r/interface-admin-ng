# File upload component

## Usage

1. Import DynamicFormModule into your AppModule:

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

    If you are using IadInterfaceAdminModule in your root module, then in your child module use simple

     ```typescript
         @NgModule({
             imports: [
                 DynamicFormModule
             ]
         })
         export class FormsModule {}
     ```

2. Use following in your component's template:

    ```html
       <iad-file-upload
           [inputId]="my_awesome_file_upload"
           [inputReadonly]="false"
           [styleClass]="my-awesome-file-upload"
           [fileName]="my-previously-uploaded-file.png"
           (onBlur)="onBlur()"
       ></iad-file-upload>
    ```

## Properties

Name | Type | Description
---- | ---- | -----------
inputId | string | Id for internally used input 
inputReadonly | boolean | Flag to make file readonly
styleClass | string | Css style class
fileName | string | Name of the previously uploaded file. Will be changed after new file was chosen

## Events

Name | Type | Description
---- | ---- | -----------
onBlur | any | Event, that is fired when user touches file input
