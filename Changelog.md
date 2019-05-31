#0.0.3-devel.16

#Projection form

##Features

* Added support of file inputs
* Added support of dataSourcePaths For every field in form projection. You can set dataSourcePath in field properties inside form projection as dot separated string. the value for such field will be taken from rawFormData JSON using this path.
* inputComponents made as @Input(). Now you can set your own input components to form
* inputModels made as @Input(). Now you can set your own input component models to form
* serverError made as @Input(). Now you can pass form error to show it inside of dynamic form
* onFormSubmit passes the form submit event to upper level. Now you can handle form submitting on your own
* onFormCancel passes the form cancel event to upper level. Now you can handle form cancelling on your own
* added styleClass @Input(). Now you can set custom styles for iad-dynamic-form when using form-view
* added defaultSourcePath input. Now you can configure default source path to fill the form from rawFormData

##Breaking changes

###for partner project

* IadFormProjection used in favor of DocumentFormProjection
* DocumentFormProjectionGroup removed as unused
* DocumentInfoBufferService clear removed from ngOnDestroy in ProjectionFormComponent <-- it may cause new bug when someone close forms
* ProjectionFormComponent, FormGroupChildCallback are no more accessable from 'iad-interface-admin/partner'. use 'iad-interface-admin/form' instead
* ProjectionFormPartnerModule is no more accessable from 'iad-interface-admin/partner'. Use 'iad-interface-admin/form' instead
* default styleClass "content-flex form-wrapper flex-center" removed. You must set it in your form-view
* ProjectionForm.data is now deprecated. Please use only ProjectionForm.rawFormData
* added necessity to implement IadReferenceProjectionProviderService
* added defaultSourcePath input. Now you can configure default source path to fill the form from rawFormData

###For main project

* FormViewComponent is replaced with IadProjectionFormComponent
* iad-form-view selector repalced with iad-projection-form
* IadReferenceProjectionProviderService is replaced with IadReferenceProjectionProviderInterface
* added compatibilityMode default to true
* onFormSubmit saves form data only in compatibilityMode
* onFormCancel redirects only in compatibility mode
* removed iad-dynamic-form div wrapper (may cause some problems in markup)
* IadFormProjectionInterface, IadFormProjection  * are no more accessable from 'iad-interface-admin'. Use 'iad-interface-admin/form' instead
* IFormProjectionField is no more accessable from 'iad-interface-admin'. Use 'iad-interface-admin/form' instead
* IadReferenceProjectionProviderService is no more accessable from 'iad-interface-admin'. Use 'iad-interface-admin/form' instead
* added necessity to implement IadReferenceProjectionProviderService

## IMPORTANT @TODO's

* using of ProjectionsApiService  is replaced with external IadReferenceProjectionProviderService. We must use modulewithProviders in both projects!!!
* remove compatibilityMode as soon as possible
* using of "data" field is not welcome. Please use rawFormData instead

## Migration

1. IadFormProjectionInterface

    before: `import {IadFormProjectionInterface} from 'iad-interface-admin';`
    
    after: `import {IadFormProjectionInterface} from 'iad-interface-admin/form';`
    
2. IadReferenceProjectionProviderService

    before: `import {IadReferenceProjectionProviderService} from 'iad-interface-admin';`
    
    after: `import {IadReferenceProjectionProviderInterface} from 'iad-interface-admin/form';`
    
3. IadFormProjection

    before: `import {IadFormProjection} from 'iad-interface-admin';`
    
    after: `import {IadFormProjection} from 'iad-interface-admin/form';`
    
4. iad-form-view

    before: 
    
        <iad-form-view
          [projection]="projection"
          [formProjectionSubject]="formProjectionSubject"
          [postDataUrl]="postDataUrl"
          [rawFormData]="rawFormData"
        ></iad-form-view>
        
    after either: 
        
        <iad-projection-form
            [formProjection]="projection"
            [formProjectionSubject]="formProjectionSubject"
            [postDataUrl]="postDataUrl"
            [rawFormData]="rawFormData"
            [compatibilityMode]="true"
            [projectionService]="projectionService"
        ></iad-projection-form>
        
    or, if you don't want to use compatibilityMode:

        <iad-projection-form
            [formProjection]="projection"
            [formProjectionSubject]="formProjectionSubject"
            [rawFormData]="rawFormData"
            [serverError]="serverError"
            (formSubmit)="onFormSubmit($event)"
            (formCancel)="onFormCancel($event)"
        ></iad-projection-form>
        
    You should specify projectionService in  IadInterfaceAdminModule config like following:
    
        IadInterfaceAdminModule.forRoot({
            i18nEnabled: true,
            defaultI18nLang: 'ru',
            noi18nMessage: 'translation-not-found',
            referenceProjectionProvider: { provide: IadReferenceProjectionProviderService, useClass: ReferenceProjectionProviderService }
        })
     
    Also you should implement onSubmit and onCancel event handlers, 
    
    Feel free to implement IadDataOperationsService and IadRouterHistoryService in your project
    
    
#0.0.2-devel.15

####Bugs fixed:

* Removed multiple event managers

####Breaking changes:
 
* Event manager is no more available from 'iad-interface-admin' and shoul be imported from 'iad-interface-admin/core' 

#0.0.2-devel.12

####Bugs fixed:

* Fixed checkbox "false" value
* Added onBlur to every dynamic-form component except reachEditor

####Features

* Added ability to replace form data in dynamic form by setting formInputGroup 
* Changed form-view initialization behavior. Form initialization had been performed in  ngAfterContentInit, that is not correct, because we shall not wait for all form components initialization to view the form with data; In order to avoid problems with initialization (when form tries to initialize before data or projection is set) I added ngOnChange hook that performs form init only when data is changed   

#0.0.2-devel.11

####Bugs fixed:

* Styled InputComponents are now able to be styled again
* Problems with chips styling fixed 

####Breaking changes:

* Colons were removed form Input Component's labels
 

#0.0.2

####Features

* iad-tooltip-notifier accept contentChild template for displaying of tooltip icon as:

```
  <ng-template>
    <fa-icon [icon]="'exclamation-circle'" [size]="'2x'" [ngStyle]="{color: 'red'}"></fa-icon>
  </ng-template>
```

####Breaking changes:

* iad-tooltip-notifier has no "tooltip-error" css class by default
* iad-tooltip-notifier has no "iad-tooltip-notifier" css class by default
* tooltip is shown even for valid form inputs (may be removed by setting [active]="false")

#0.0.1.devel.7

####Features

* DynamicForm: Dependencies input model property allow configuring of cascade inputs (i.e. address forms where street is dependent on city etc.); For now it works ONLY for lookups in "partner" project (recalculateDependencies method add id to field name), needs refactoring
* DynamicForm: Nested formGroups (DropdownGroups) may use external components configured for form
* DynamicForm: Added availability for dynamic form to add custom formFooter template. Default template is:

```
  <iad-dynamic-form ...props....>
     <ng-template pTemplate="footer" let-cancelBtnTpl="cancelBtnTpl" let-submitBtnTpl="submitBtnTpl">
	<div class="form-submit-buttons">
	    <ng-template [ngTemplateOutlet]="cancelBtnTpl" [ngTemplateOutletContext]="{styleClass: 'btn'}></ng-template>
	    <ng-template [ngTemplateOutlet]="submitBtnTpl" [ngTemplateOutletContext]="{styleClass: 'btn btn-primary'}></ng-template>
        </div>
    </ng-template>
  </iad-dynamic-form>
```
* DynamicFormComponent.context property made keeping initial formGroup value.


####Breaking changes:

* Form class style "input-group" replaced to "div.input-wrapper" inside "col-{size}"
* Added prefix iad- to selector of every form input component
* FormBooleanComponent renamed to IAdFormCheckboxComponent
* Removed <div [hidden]="!child[0].visible"> .... </div> code. Use "hidden" property in form projection's input config
* removed default dynamic form footer configured for "partner" project

####Known issues

* Russian text inside templates
* "partner" project related styles should be replaced to form options
* Dependencies works ONLY for lookups, needs refactoring (recalculateDependencies method add id to field name)

#0.0.1.devel.6

* ProjectionsHelper replaced to lib/common/helpers (available from 'interface-admin-ng')
* Added property "enableInfiniteScroll" default to false IadScrollableViewComponent exported from 'interface-admin-ng/core'
* Renamed IadTableComponent.askToRefresh to IadTableComponent.doRefresh
* Added property enableInfiniteScroll default to false IadTableComponent exported from 'interface-admin-ng/core'
* Added export of IadCommonModule from 'interface-admin-ng'

####Breaking changes

* StringHelper now available as part of 'interface-admin-ng/core' package

#0.0.1.devel.5 

* Removed fa4AngleDoubleDown from public_api
* Removed PrimengCustomizeModule; all imported primeng modules and declared extension-components are replaced to iad-primeng
