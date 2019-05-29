#0.0.2-devel.12

####Bugs fixed:

* Fixed checkbox "false" value

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
