[InterfaceAdminNg](../../../../../README.md) / [Usage](../../../../../docs/2-usage-guide.md) / PrimeNG Table based full-featured DataGrid

# PrimeNG Table based full-featured DataGrid

## Usage:

```html
<iad-base-grid
    [allowUnSelectRow]="allowUnSelectRow"
    [changeTableHeight]="changeTableHeight"
    [columns]="columns"
    [defaultSortField]="defaultSortField"
    [defaultSortOrder]="defaultSortOrder"
    [enableInfiniteScroll]="true"
    [filter]="filter"
    [filterType]="filterType"
    [gridId]="groupSettingsKey"
    [lazy]="lazy"
    [paginator]="paginator"
    [refreshGridConfig]="refreshGridConfig"
    [refreshOnInit]="true"
    [resetFilter]="resetFilter"
    [searchUrl]="searchUrl"
    [showFilter]="showFilter"
    [staticFrozenColumns]="staticFrozenColumns"
    [staticFrozenRightColumns]="staticFrozenRightColumns"
    [staticFrozenRightWidth]="staticFrozenRightWidth"
    [staticFrozenWidth]="staticFrozenWidth"
    [tableStyleClass]="tableStyleClass"
    [unSelectRow]="unSelectRow"
    [updateVisibility]="updateVisibility"
    [value]="value"
    (onSettingChanged)="onSettingChanged($event)"
    (selectionChange)="onSelectionChange($event)"
></iad-base-grid>
```

## Properties:

@Input() Name|Type|Description
-------------|----|-----------
allowUnSelectRow|boolean|Flag to allow to unselect rows
changeTableHeight|Subject()|Subject to recalculate table height
columns|IadGridColumn[]|@deprecated. Grid columns. May be installed via IadGridConfigModel 
defaultSortField||
defaultSortOrder||
enableInfiniteScroll|boolean|
filter||
filterType||
gridId|string|
lazy|boolean|
paginator|boolean|
refreshGridConfig|Subject<IadGridConfigModel>()|
refreshOnInit|boolean|
resetFilter||
searchUrl|string|
showFilter||
staticFrozenColumns|IadGridColumn[]|
staticFrozenRightColumns|IadGridColumn[]|
staticFrozenRightWidth|string|
staticFrozenWidth|string|
tableStyleClass|string|Style css class to add to &lt;table&gt; html tag 
unSelectRow||
updateVisibility||
value|any[]|

## Events:

@Output() Name|Type|Description
-------------|----|-----------
onSettingChanged||
selectionChange||

## Features:

* refresh
  
  to refresh dta-grid pass new instance of `IadGridConfigModel` to its `@Input() refreshGridConfig` property. DataGrid will be refreshed only with reInstalling of grid config.   
