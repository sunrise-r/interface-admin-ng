# 0.0.4@devel.36

* GRID: Changed grid refresh scenario; Now grid update require grid settings every time; Another one change removes double grid refresh in projection-grid

#0.0.4@devel.35

## Features

* FORM: Added ability to consider group names when using nested input groups

`IadFormComponent @Input() considerSourcePathGroups;`

#0.0.4@devel.34

## Breaking changes for partner project

* removed useless IADFrameworkModule from 'iad-interface-admin/partner'

## Features

* FORM: Added ability to inherit input group (references) validationTypes.required when it was set into "true" state
* FORM: Added form instance to form footer template (let-form="form")
* FORM: Made FilterBuilderService @Injectable()
* GRID: Added ProjectionGrid.refresh: Subject<boolean>() to have possibility to refresh data in gridTable
* GRID: Disabled InfiniteScroll by default
* GLOBAL: Added export of primeng shared module from IadPrimengModule; version changed

## Compatibility with iad-admin (backend)

* No more difference if you are using dataSourcePath or datasourcePath in projections. But please, prefer dataSourcePath

#0.0.4@devel.22

## For all projects

* You are able to implement FilterBuilderInterface like this:

```typescript
export class MyQueryBuilder implements CustomizeQuery {
    /**
         * @param name; Usage with operator: OR.name
         * @param value
         * @param useWildCard
         */
        addFilter(name: String, value: any, useWildCard?: boolean): AddOption {
            return this;
        }
    
        addOption(delegate: string, action: string, field: string): CustomizeQuery;
        addOption(delegate: string, action: string): CustomizeQuery;
        addOption(delegate: string): CustomizeQuery;
        addOption(delegate: string, action?: string, field?: string): CustomizeQuery {
            return this;
        }
    
        build(): String {
            return '';
        }
    
        merge(raw: BuilderRaw): CustomizeQuery {
            return this;
        }
    
        raw(): BuilderRaw {
            return new BuilderRaw({
                filters: Filter[] = [],
                options: Option[] = []
            });
        }
}

export class MyFilterBuilderService implements FilterBuilderInterface() {
    filter: CustomizeQuery;
    
    createFilter(type?: string): CustomizeQuery {
        this.filter = new MyQueryBuilder();
        return this.filter;
    };
    merge(builder: CustomizeQuery): FilterBuilderInterface {
        return this;
    };
    build(options: BuildOptions, prevEvent: any): string {
        let result = ''; 
        if (this.beforeBuildHook(options)) {
            result += this.filter.build();
        }
        this.afterBuildHook(prevEvent);
        return result;
    };
    beforeBuildHook(options: BuildOptions): boolean {
        return true;
    };
    afterBuildHook(event: any) {
        console.log('do something');
    };
}


IadInterfaceAdminModule.forRoot({
    i18nEnabled: true,
    defaultI18nLang: 'ru',
    noi18nMessage: 'translation-not-found',
    filterBuilderProvider: { provide: FILTER_BUILDER, useClass: MyFilterBuilderService }
})
```

##Breaking changes

### For main project

* QueryBuildCallback is removed
* ElasticService made provided in root
* GridComponent.onBuildQuery:QueryBuildCallback replaced with GridComponent.filter: CustomizeQuery

### For partner project

* IDataTableColumn removed in favor of IadGridColumn
* DataTableConfigModel removed in favor of IadGridConfigModel
* DataTablecomponent.groupSettingsKey replaced with GridComponent.gridId
* added GridComponent.enableInfiniteScroll default to false
* DataTablecomponent.items replaced with GridComponent.value
* GridComponent.pageSize must be set in module config! (Before it was 60)
* DataTablecomponent.lazyLoadingEnabled replaced with GridComponent.lazy
* removed ActualSelectionModel. Implement it outsiside!
	export class ActualSelectionModel {
	    action: SELECT_ACTION;
	    documentDTO?: any;
	    documentIndex?: any;
	    properties?: any;
	    referenceDocuments?: any;
	    type?: string;
	    selection?: any;
	}
* removed SelectionBufferService
	@Injectable({
	    providedIn: 'root'
	})
	export class SelectionBufferService {
	    dataUpdated: Subject<ActualSelectionModel> = new Subject<ActualSelectionModel>();

	    constructor(private dataBuffer: DataBufferService) {}

	    init(event) {
		this.dataBuffer.setData('selection', event);
		this.dataUpdated.next(this.getSelection());
	    }

	    getSelection(): ActualSelectionModel {
		return <ActualSelectionModel>this.dataBuffer.getData('selection');
	    }

	    getSelectionIndex() {
		return this.getSelection().selection;
	    }

	    getDTO() {
		return this.getSelection().documentDTO;
	    }

	    getProperties() {
		return this.getSelection() ? this.getSelection().properties : null;
	    }

	    getProperty(name: string) {
		return this.getProperties() ? this.getProperties()[name] : null;
	    }

	    getIndex() {
		return this.getSelection().documentIndex;
	    }

	    concat() {
		return Object.assign({}, this.getDTO(), this.getSelectionIndex(), this.getIndex(), this.getProperties());
	    }

	    getClassName(): string {
		const className: string = this.getProperties() ? this.getProperties().className : null;
		return className ? StringHelper.parseDotPathLastSection(className) : null;
	    }

	    clean() {
		this.dataBuffer.cleanData('selection');
	    }
	}
* removed DataBufferService
	@Injectable({
	    providedIn: 'root'
	})
	export class DataBufferService {
	    private dataSource: Map<string, any> = new Map<string, any>();

	    dataUpdated: Subject<DataBufferService> = new Subject<DataBufferService>();

	    /**
	     * Сохраняет данные в буффер
	     * @param key
	     * @param data
	     */
	    setData(key: string, data: any) {
		this.dataSource.set(key, data);
		this.dataUpdated.next(this);
	    }

	    /**
	     * Возвращает данные из буффера
	     * @param key
	     */
	    getData(key: string): any {
		return this.dataSource.get(key);
	    }

	    /**
	     * Возвращает true если данные по ключу чуществуют и равны данным из второго параметра
	     * @param key
	     * @param data
	     */
	    areEquals(key: string, data: any): boolean {
		return (
		    this.dataSource.has(key) &&
		    (typeof this.dataSource.get(key) === 'string' ? this.dataSource.get(key) : JSON.stringify(this.dataSource.get(key))) ===
		        (typeof data === 'string' ? data : JSON.stringify(data))
		);
	    }

	    /**
	     * Возвращает данные и удаляет из буфера
	     * @param key
	     */
	    getCleanData(key: string): any {
		const data = this.getData(key);
		this.cleanData(key);
		return data;
	    }

	    /**
	     * Удаляет данные из буфера
	     * @param key
	     */
	    cleanData(key: string) {
		this.dataSource.delete(key);
	    }
	}
* ENTITY_TYPE removed from partner lib section
	export enum ENTITY_TYPE {
	    DOCUMENT = 'document',
	    OPERATION = 'operation',
	    RESOLUTION = 'resolution'
	}



#0.0.3-devel.20

## Fixed bugs

* fixed form dropdowns
* fixed translated form inputs
* fixed "active" toolbar action model property


#0.0.3-devel.19

* Replaced iad-interface-admin/partner/filter-builder and iad-interface-admin/elastic to separate lib section iad-interface-admin/filter

##Breaking changes

* CustomizeQuery, FilterBuilderService, FilterBuilderFactory are now available only from 'iad-interface-admin/filter'
* ElasticSearchQueryBuilder, ElasticService, ElasticFactory are now available only from 'iad-interface-admin/filter'

#0.0.3-devel.18

* Removed iad-interface-admin/partner/toolbar in favor of iad-interface-admin/toolbar

##Breaking changes for partner project

* ToolbarActionDirective is no more accessible from 'iad-interface-admin/partner' 
* ToolbarActionsComponent is no more accessible from 'iad-interface-admin/partner' 

#0.0.3-devel.17

* Removed iad-interface-admin/partner/common in favor of iad-interface-admin/common

##Breaking changes for partner project

* TabbedViewComponent is no more accessible from 'iad-interface-admin/partner'

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
