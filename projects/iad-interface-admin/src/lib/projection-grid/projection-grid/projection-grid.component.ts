import * as _ from 'lodash';
import {
    AfterContentInit,
    Component,
    ContentChildren,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { PrimeTemplate } from 'primeng/shared';
import { Subject, Subscription } from 'rxjs';
import { CustomizeQuery } from 'iad-interface-admin/filter';

import { DocumentListProjection } from '../model/projection-grid.model';
import { IadGridColumn } from '../../iad-base-grid/model/iad-grid-column.model';
import { IadGridConfigModel, IadGridConfigInterface } from '../../iad-base-grid/model/iad-grid-model';

@Component({
    selector: 'iad-projection-grid',
    templateUrl: './projection-grid.component.html'
})
export class ProjectionGridComponent implements OnInit, AfterContentInit, OnChanges {
    /**
     * Флаг "Разрешить снятие выделения"
     */
    @Input() allowUnSelectRow = false;

    /**
     * Subject to notify table about height change
     */
    @Input() changeTableHeight: Subject<boolean> = new Subject<boolean>();

    /**
     * Projection table columns
     */
    @Input() columns: IadGridColumn[];

    /**
     * Контекст работы компонента.
     * Используется для:
     * Построения url запроса данных
     */
    @Input() context: any = null;

    /**
     * Allows to make table and toolbar disabled
     */
    @Input() disabled: boolean;

    /**
     * Ability to pass any templates outside of projection table
     */
    @Input() externalTemplates: QueryList<PrimeTemplate>;

    /**
     * External additional filter of type "CustomizeQuery"
     */
    @Input() filter: CustomizeQuery;

    /**
     * Включен ли фильтр по столбцам (По умолчанию true)
     */
    @Input() filterEnabled = true;

    /**
     * String filter builder type.
     */
    @Input() filterType: string;

    /**
     * Table has toolbar right above the header
     */
    @Input() hasToolbar: boolean;

    /**
     * #4 Add paginator to the table
     */
    @Input() paginator: boolean;

    /**
     * unique code to identify current presentation
     */
    @Input() presentationCode: string;

    /**
     * Current grid projection
     */
    @Input() projection: DocumentListProjection;

    @Input() lazy: boolean;

    /**
     * Update grid subject
     */
    @Input() refresh: Subject<boolean> = new Subject<boolean>();

    /**
     * @todo check if we need it
     * Flag to add 'responsive' css class
     */
    @Input() responsive: boolean;

    /**
     * Flag to check if grid filter should be shown
     */
    @Input() showFilter: boolean;

    /**
     * Projection table values
     */
    @Input() value: any[] = [];

    /**
     * PrimeNg Table templates
     */
    @ContentChildren(PrimeTemplate) innerTemplates: QueryList<PrimeTemplate>;

    /**
     * Template to add content between toolbar and settings-table
     */
    belowTheToolbarTemplates: TemplateRef<any>[] = [];

    /**
     * Templates for every column type in format {key: value}
     */
    colTemplates: { [param: string]: TemplateRef<any> } = {};

    /**
     * Sending table config to BaseGridComponent
     */
    refreshGridConfig: Subject<IadGridConfigInterface> = new Subject<IadGridConfigInterface>();

    /**
     * @todo check if we need it
     * Throws filter reset event
     */
    resetFilter: Subject<boolean> = new Subject<boolean>();

    /**
     * Шаблон для добавления контента в правую часть кнопок тулбара
     */
    rightAddonTemplate: TemplateRef<any>;

    /**
     * Search url for grid-component
     */
    searchUrl: string;

    private refreshSbt: Subscription;

    private static resolveUrl(searchUrl: string, context: any) {
        if (context === null || searchUrl === null) {
            return searchUrl;
        }
        const compiled = _.template(searchUrl);
        return compiled(context);
    }

    constructor() {
    }

    ngOnInit() {
        this.refreshSbt = this.refresh.subscribe(() => {
            this.refreshGridConfig.next(this.populateGridConfig());
        });
    }

    ngAfterContentInit(): void {
        this.updateTemplates(this.externalTemplates);
        this.updateTemplates(this.innerTemplates);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('projection' in changes || 'presentationCode' in changes || 'filter' in changes) {

            // this.queryCallback = this.initQueryCallback.bind(this);
            // this.initColumns();
            // #issue 1249 we must load actualInfo if it is not false in loadActualInfo input
            // this.loadActualInfo = this.initLoadActualInformationFlag();
            // this.groupSettingsKey = this.settingsGroupName(this.projection.code);
            // this.unSelectRow.next(true);
            if (this.presentationCode && this.projection) {
                this.searchUrl = ProjectionGridComponent.resolveUrl(this.projection.searchUrl, this.context);
            }
            this.sendRefreshGridConfig();
        }
    }

    /**
     * Произведён клик в тулбаре
     */
    onActionClicked(event: { nativeEvent: Event; action: ToolbarAction }): void {
        const strategy = {
            columnFilter: () => {
                this.showFilter = event.action.active;
                this.showSearchPanel = false;
                this.changeTableHeight.next(true);
            },
            search: () => {
                this.showFilter = false;
                this.resetFilter.next(FILTER_TYPE.PARTICULAR);
                this.showSearchPanel = event.action.active;
                this.changeTableHeight.next(true);
            },
            clear: () => {
                this.resetFilter.next(FILTER_TYPE.BOTH);
                this.doTableAction.next({ code: event.action.code, value: event.action.active });
                this.showSearchPanel = false;
                this.showFilter = false;
            }
        };
        if (event.action.code in strategy) {
            strategy[event.action.code]();
        }
        this.actionClicked.emit(event);
    }

    sendRefreshGridConfig(): void {
        this.refreshGridConfig.next(this.populateGridConfig());
    }

    populateGridConfig(): IadGridConfigInterface {
        const config = new IadGridConfigModel();
        config.set('columns', this.columns);
        config.set('searchUrl', this.searchUrl);
        config.set('reset', true);
        if (this.filter) {
            config.set('filter', this.filter);
        }
        return config;
    }

    /**
     * Filter event handler
     */
    onFilter(event: any, col: any) {
        // this.dt.filters = {};
        // this.dt.filter(event.value, col.field, col.filterMatchMode);
        // this.refresh();
    }

    /**
     * Update templates to show them inside templateOutlets
     * @param templates
     */
    private updateTemplates(templates: QueryList<PrimeTemplate>) {
        templates.forEach(item => {
            switch (item.getType()) {
                case 'toolbarRightAddon':
                    this.rightAddonTemplate = item.template;
                    break;
                default:
                    this.belowTheToolbarTemplates.push(item.template);
            }
        });
    }

}
