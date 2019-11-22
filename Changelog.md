# 1.0.9-alpha.140

* \[GRID] removed default sizes from Tooltip Notifier
* \[GRID] added defaultSortField and defaultSortOrder for list projections

# 1.0.9-alpha.139

* \[FORM] added <span> HTML tag to the header of the group component

# 1.0.9-alpha.138

* \[FORM] removed mb-2 css class from all form inputs

# 1.0.9-alpha.137

* \[FORM] flatten form-groups will now add "iad-form-group-flatten" css class to themselves

# 1.0.9-alpha.136

* \[FORM] fixed extra mb-2 for form-groups

# 1.0.9-alpha.135

* \[FORM] optimized html code for groups and form itself
* \[FORM] added touched form input event forwarding for groups
* \[FORM] Added iadElementFocus to every form input wrapper in form module

# 1.0.9-alpha.134

* \[FORM] fixed input type consideration (i.e. for "password" input fields)

# 1.0.9-alpha.133

* \[FORM] fixed setting interpolateParams for translatable errors

# 1.0.9-alpha.130

* \[FORM] fixed setting of form context to nested form input components

# 1.0.9-alpha.116

* \[FORM] fixed recursive file fields search for flatten input groups. 

# 1.0.9-alpha.115

* \[GLOBAL] fixed form validation error collection to show nested forms errors as well
 
# 1.0.9-alpha.114

* \[GRID] Fixed bug with multiple resetToggleableStatus change subscriptions in ToolbarActionsComponent

# 1.0.9-alpha.113

* \[FORM] Bug fixed with setiing form input's defaul tvalues from projections

# 1.0.9-alpha.112

* \[FORM] IadProjectionFormService.updateInputValue method refactored to use input's default value; It will use previous value for updating fields when no value is present in raw form data
* \[FORM] Added ability to update form inputs, that already contain values;

# 1.0.9-alpha.111

* \[GRID] added ToolbarClickEvent interface and element property within it 

# 1.0.9-alpha.110

* \[GRID] fixed column multiple external css classes addition 

# 1.0.9-alpha.106

* \[FORM] added updateForm method to dynamic-form.comnponent. So you can trigger form values update
* \[FORM] added updateFormGroup method to FormControlService. Now you can simply update form values without form rebuilding

# 1.0.9-alpha.105

* \[FORM] added updateFormValues method to iad-projection-form.service

# 1.0.9-alpha.104

* \[FORM] fixed flatten form data for third and deeper levels

# 1.0.9-alpha.103
 
* \[FORM] added @Input() fileName to file-upload-component

# 1.0.9-alpha.101

* \[GRID] removed default tableStyleClass "partner-table" since it belongs to partner project
* \[GLOBAL] added scss files to keep default styles for iad

# 1.0.9-alpha.100

* \[GLOBAL] IadPresentationLoadService is removed from lib
* \[GRID] Added "infoUrl" property to listProjection model

# 1.0.9-alpha.99

* \[GRID] removed iadTableColumnSizeDisabled col property because this property does not allow to set hard size of columns

# 1.0.9-alpha.97

* CORE added export of IadObjectUtils extension for primeng/ObjectUtils

# 1.0.8-alpha.95

* \[FORM]S added iadElementFocus directive. This directive will produce (elementFocus) event<{focus: boolean, nativeEvent: ClickEvent}> when something is clicked inside its host element and also will add ui-focused css class to the host element;

# 1.0.8-alpha.94

* \[GLOBAL] added @Input() configIcon: string to the class IadIconOutletComponent; It allows to set for any `<iad-icon-outlet>` customizable through NgModule.forRoot() module config icons:


Example 1.

   ```html
    <iad-icon-outlet icon="fas chevron-up"></iad-icon-outlet>
    ```
    
will add
    
   ```html
   <fa-icon [icon]="['fas', 'chevron-up'"></fa-icon>
   ```
   
Example 2. 

    ```html
    <iad-icon-outlet icon="pi pi-chevron-up"></iad-icon-outlet>
    ```
    
will add
    
   ```html
   <i class="pi pi-chevron-up"></i>
   ```  

Example 3. 

    ```html
    <iad-icon-outlet configIcon="chevron-up"></iad-icon-outlet>
    ```
    
when:
    
    ```typescript
    IadInterfaceAdminModule.forRoot({
        ...,
        icons: {
         'chevron-up': 'custom-chevron-up'
        }
    })
    ```
    
will add
    
   ```html
   <i class="custom-chevron-up"></i>
   ```

* \[FORM] added customizable chevron-up icon to iad-form-group

# 1.0.8@alpha.90

* \[GLOBAL]; GRID added ability to customize icons for grid sorting. To configure icons you shold use NgModule.forRoot() module config as following:

    ```typescript
    IadInterfaceAdminModule.forRoot({
        ...,
        icons: {
         'grid-sort-asc': 'pi pi-sort-up',
         'grid-sort-desc': 'pi pi-sort-down',
         'grid-sort': 'pi pi-sort'
        }
    })
    ```

    to use FontAwesome icons you should add `fa`, `fas` or `far` prefix to your icons
    
    ```typescript
    IadInterfaceAdminModule.forRoot({
        ...,
        icons: {
         'grid-sort-asc': 'fas sort-up',
         'grid-sort-desc': 'fas sort-down',
         'grid-sort': 'fas sort'
        }
    })
    ```
    
    This schema will be used in future for all icons in project

# 1.0.8@alpha.89

* \[FORM] removed iad-tooltip-notifier default icons styling for projection-form
* \[FORM] refactored dropdown input component. Now it is combined with multiSelection component 

# 1.0.8@alpha.88

* \[GRID]: Added ability to set [Angular Perfect Scrollbar](https://github.com/zefoy/ngx-perfect-scrollbar) for grid

    ```html
    <iad-projection-grid
        [enablePerfectScroll]="true"
        [enableInfiniteScroll]="true"
    ></iad-projection-grid>
    ```
    
    NOTE: It will make any sense only if enableInfiniteScroll is true and grid has absolute positioning with set up width and height;

# 1.0.7-alpha.78

* \[FORM] disableFooter changed to isNestedForm. It will not only disable form footer, but also disable the whole <form> tag, leaving clear <fieldset> inner content 

# 1.0.7-alpha.77

* \[FORM] Export of DynamicFormComponent
* \[FORM] disableFooter option will disable form footr when set to true
* \[FORM] added outgoing valueChanges event


# 1.0.7-alpha.75

* \[FORM] added support for selection-restricted values for autocomplete
* \[GRID] changed minimum input length for delete action in action column

# 1.0.7-alpha.74

* \[FORM] added export of all dynamic form models and components
* \[FORM] added dropdown options valueField: string; and  labelField: string;
* \[FORM] added date and datetime option dateFormat: string; to set displaying date

# 1.0.7-alpha.73

* \[FORM] Now possible to set fieldTypes for fields in projection-form lowerCamelCase

# 1.0.7-alpha.72

* \[GRID] ReferenceProjection field name is used as group name instead of inner field names to create
* \[GRID] removed IadProjectionLoadService from iad	pavel.a	23.07.2019 09:51
* \[FORM] removed IadRouterHistoryService from iad
* \[FORM] exported IadFieldValuesService from iad

# 1.0.7-alpha.70

* \[FORM] findProjectionByName changed to findFormProjectionByName

# 1.0.7-alpha.69

* \[GRID] TabbedViewComponent is no more exist in iad

# 1.0.7-alpha.68

* \[FORM]: Enhancement for nested (reference) forms. Forms made hierarchically nested

# 1.0.7-alpha.67

* \[GRID]: Refactoring of BaseGridComponent:

    Removed:
    
    ```typescript
    /**
     * Internal settings changed event
     */
    @Output() onSettingChanged: EventEmitter<CmsSetting> = new EventEmitter<CmsSetting>();
    ```

    Added:
    
    ```typescript
    /**
     * event, that fired on column size change
     * will propagate object with column names as keys and sizes as value;
     */
    @Output() columnResize = new EventEmitter<{ [param: string]: string | number }>();

    /**
     * event, that is fired on any column is dynamically made frozen
     * will propagate array with field name, frozen state and frozen area for each column
     */
    @Output() columnFrozen = new EventEmitter<IadGridColumnFrozenField[]>();

    /**
     * event, that is fired when we need to update frozen areas sizes
     * will propagate object containing rightWidth: string, public leftWidth: string
     */
    @Output() frozenAreasUpdated = new EventEmitter<IadGridColumnFrozen>();

    /**
     * event, that is fired on any column position is changed in a drag and drop way
     * will propagate columns array
     */
    @Output() columnReorder = new EventEmitter<any[]>();

    /**
     * event, that is fired on any column is sorted
     */
    @Output() columnSort = new EventEmitter<{value: string, field: string, order: number}>();
    ```
* \[GRID] Refactoring of ProjectionGridComponent: added handlers to new BaseGridComponent's events

* \[GRID] Removed CmsSetting class

# 1.0.7@devel.62

* \[GRID]: Added ability to pass columnComponents for Grid columns through @Input columnComponents as following:

     ```typescript
      const columnComponents = {
          formatterName: ColumnDisplayEntryComponent
      }   
     ```

* \[FORM]: IadFormComponent @Input() considerSourcePathGroups replaced with IadFormComponent @Input() flattenData

    `IadFormComponent @Input() flattenData;`

    if you want your data DTO would use plain data structure set flattenData true
    
# 1.0.7@alpha.60

* \[FORM]: Changed "plain/flatten" behavior for fields with referenceProjections. 

    Before: properties.plainReference formProjection field option made "Data and Groups flatten" strategy for form;
    After: properties.plainReference keeps its functionality, but two more properties were added: properties.flattenData, properties.flattenFields. New strategy implies that if one of new options is used in formProjection field properties.plainReference will not work. Below is an explanation of how these two option work.
     
     1) setting both options "true" will equal to set properties.plainReference = true:
     
     ```json
        {
         "properties" : {
          "flattenData": true
          "flattenFields": true
         }
        }  
     ```      
              
    2) `"flattenData": true` will mean that form data will sent to your API in flatten object, even if `"flattenFields": false` and referenceProjection data will be grouped into collapsable component: 
    
    ```json
        {
         "properties" : {
          "flattenData": true
          "flattenFields": false
         }
        }  
    ```  
             
    3) `"flattenFields": true` will mean that form data will **not** be grouped into collapsable component. Although, if `"flattenData": false` referenceProjection data will be sent to your API **grouped** by reference field name (group key): 
          
    ```json
        {
         "properties" : {
          "flattenData": false
          "flattenFields": true  
         }
        }  
    ```  
            
    4) setting both options "false" will equal to not set any of properties.plainReference, properties.flattenData or properties.flattenFields;
    
* \[FORM]: Note that formSubmit EventEmitter enits event containing formData and fileInputKeys; If you need to flatten fileInputKeys into formData you should implement relevant methods by yourself

* \[FORM]: Note that if you will use flattenData mode for fields with referenceProjections **data from referenceProjection group will have higher priority than root form data**. In other words fields with the same name in root and nested form groups will be replaced with nested form group input value. i.e.:

    ```json
        {
         "field": "value",
         "field2": {
              "field": "value2"       
          }
        } 
    ```
    
    will be flatten into
    
    ```json
        {
         "field": "value2"
        } 
    ```

# 1.0.6@alpha.59

* \[FORM]: fixed extra space used with hidden form inputs

# 1.0.6@alpha.56

* \[GRID]: Columns are allowed to set only from @Input() projection. Direct setting is deprecated and affects nothing

# 1.0.6@alpha.53

* \[GRID]: Added GridSettingsStorageInterface inmplementation to keep table settings in user's localStorage
* \[GRID]: Added ability to set your own GridSettingsStorageInterface imlementation through `settingsKeeper: { provide: SETTINGS_KEEPER, useClass: GridSettingsStorageServiceImpl }` iad-interface-admin module option
 
# 1.0.6@alpha.51

## Cheers! 1.0.6@alpha will be our first tagged version!

* MAIN: ProjectionTableComponent, ProjectionTableModule, GridToolbarComponent(TableToolbarComponent) and GridSearchPanel(TableSearchPanel) are replaced to 'interface-iad-admin' main project from 'interface-iad-admin/partner' partner project
* PARTNER: PARTNER PROJECT IS NO MORE EXISTS IN PROJECT
* \[GRID]: Toolbar will be shown only when hasToolbar is set true

# 0.0.6@devel.50

* \[GRID] (partner): updateActualInformation method removed from project
* \[GRID] (partner): PresentationHelper class removed from project
* \[GRID] (partner): DataChainService class removed from project
* \[GRID] (partner): ActualSelectionChainService class removed from project
* \[GRID]: SELECT_ACTION enum removed from project
* \[GRID]: IadGridRowSelection class removed from project
* \[GRID]: onGridRowSelection const removed from project
* \[GRID]: IProjectionDefaultFilter interface and ProjectionDefaultFilter class are removed from project
* \[GRID]: IIADProjection interface and IIADPresentation interface are removed from project
* \[GRID]: IADPresentation class is removed from project
* \[GRID]: Reference class is removed from project
* MAIN: DocumentDataProjection const replaced to 'interface-iad-admin' main project

# 0.0.4@devel.38

* \[GRID] Use the IadEventManager to broadcast delete event in order to update table

# 0.0.4@devel.37

* \[FORM]: If reference field is flatten (plain) then group will be not considered for this field

# 0.0.4@devel.36

* \[GRID]: Changed grid refresh scenario; Now grid update require grid settings every time; Another one change removes double grid refresh in projection-grid

#0.0.4@devel.35

## Features

* \[FORM]: Added ability to consider group names when using nested input groups

`IadFormComponent @Input() considerSourcePathGroups;`

#0.0.4@devel.34

## Breaking changes for partner project

* removed useless IADFrameworkModule from 'iad-interface-admin/partner'

## Features

* \[FORM]: Added ability to inherit input group (references) validationTypes.required when it was set into "true" state
* \[FORM]: Added form instance to form footer template (let-form="form")
* \[FORM]: Made FilterBuilderService @Injectable()
* \[GRID]: Added ProjectionGrid.refresh: Subject<boolean>() to have possibility to refresh data in gridTable
* \[GRID]: Disabled InfiniteScroll by default
* \[GLOBAL]: Added export of primeng shared module from IadPrimengModule; version changed

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
* \[GRID]Component.onBuildQuery:QueryBuildCallback replaced with GridComponent.filter: CustomizeQuery

### For partner project

* IDataTableColumn removed in favor of IadGridColumn
* DataTableConfigModel removed in favor of IadGridConfigModel
* DataTablecomponent.groupSettingsKey replaced with GridComponent.gridId
* added GridComponent.enableInfiniteScroll default to false
* DataTablecomponent.items replaced with GridComponent.value
* \[GRID]Component.pageSize must be set in module config! (Before it was 60)
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

* \[FORM]ViewComponent is replaced with IadProjectionFormComponent
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
    <fa-icon [icon]="'exclamation-circle'" [size]="'1x'" [ngStyle]="{color: 'red'}"></fa-icon>
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

* \[FORM] class style "input-group" replaced to "div.input-wrapper" inside "col-{size}"
* Added prefix iad- to selector of every form input component
* \[FORM]BooleanComponent renamed to IAdFormCheckboxComponent
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
