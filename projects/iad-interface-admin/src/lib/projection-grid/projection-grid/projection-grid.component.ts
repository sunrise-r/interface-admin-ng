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
import { IadGridConfigModel } from '../../iad-base-grid/model/iad-grid-model';

@Component({
    selector: 'iad-projection-grid',
    templateUrl: './projection-grid.component.html'
})
export class ProjectionGridComponent implements OnInit, AfterContentInit, OnChanges {
    /**
     * Коллбэк в ктором можено указать дополнительные параметры для построения query
     */
    @Input() filter: CustomizeQuery;

    /**
     * String filter builder type.
     */
    @Input() filterType: string;

    /**
     * #4 Add paginator to the table
     */
    @Input() paginator: boolean;

    /**
     * Projection table columns
     */
    @Input() columns: IadGridColumn[];

    /**
     * Table has toolbar right above the header
     */
    @Input() hasToolbar: boolean;

    /**
     * unique code to identify current presentation
     */
    @Input() presentationCode: string;

    @Input() lazy: boolean;

    /**
     * Update grid subject
     */
    @Input() refresh: Subject<boolean> = new Subject<boolean>();

    @Input()
    get projection(): DocumentListProjection {
        return this._projection;
    }

    set projection(projection: DocumentListProjection) {
        this._projection = projection;
    }

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
    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    /**
     * Sending table config to BaseGridComponent
     */
    refreshGridConfig: Subject<IadGridConfigModel> = new Subject<IadGridConfigModel>();

    /**
     * Templates for every column type in format {key: value}
     */
    colTemplates: { [param: string]: TemplateRef<any> } = {};

    /**
     * @todo check if we need it
     * Throws filter reset event
     */
    resetFilter: Subject<boolean> = new Subject<boolean>();

    /**
     * Search url for grid-component
     */
    searchUrl: string;

    /**
     * current projection
     */
    private _projection: DocumentListProjection;

    private refreshSbt: Subscription;

    constructor() {
    }

    ngOnInit() {
        this.refreshSbt = this.refresh.subscribe(() => {
            this.refreshGridConfig.next(this.populateGridConfig());
        });
    }

    ngAfterContentInit(): void {
        this.templates.forEach(item => {
            this.colTemplates[item.getType()] = item.template;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['projection'] || (changes['presentationCode'] && this.presentationCode)) && this.projection) {
            // this.queryCallback = this.initQueryCallback.bind(this);
            // this.initColumns();
            // #issue 1249 we must load actualInfo if it is not false in loadActualInfo input
            // this.loadActualInfo = this.initLoadActualInformationFlag();
            // this.groupSettingsKey = this.settingsGroupName(this.projection.code);
            // this.unSelectRow.next(true);
            this.searchUrl = this.projection.searchUrl;
            this.refreshGridConfig.next(this.populateGridConfig());
        }
        if ('filter' in changes) {
            this.refreshGridConfig.next(this.populateGridConfig());
        }
    }

    populateGridConfig() {
        const conf = new IadGridConfigModel();
        conf.columns = this.columns;
        conf.searchUrl = this.searchUrl;
        conf.reset = true;
        if (this.filter) {
            conf.filter = this.filter;
        }
        return conf;
    }

    /**
     * Filter event handler
     */
    onFilter(event: any, col: any) {
        // this.dt.filters = {};
        // this.dt.filter(event.value, col.field, col.filterMatchMode);
        // this.refresh();
    }

}
