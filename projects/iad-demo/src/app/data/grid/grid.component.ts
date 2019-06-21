import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    IadGridColumn,
    IadListProjectionInterface,
    IadPresentation,
    PROJECTION_TYPE,
    ProjectionsHelper
} from 'iad-interface-admin';
import { CustomizeQuery } from 'iad-interface-admin/filter';
import { Subject, Subscription } from 'rxjs';
import { DemoFilterBuilderService } from './demo-filter-builder.service';

@Component({
    selector: 'iad-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

    columns: IadGridColumn[];

    projection: IadListProjectionInterface;

    presentationCode: string;

    routerSubscription: Subscription;

    filter: CustomizeQuery;

    refresh: Subject<any> = new Subject();

    @ViewChild('iadProjectionGrid')
    iadProjectionGrid: any;

    constructor(private route: ActivatedRoute, private searchEngine: DemoFilterBuilderService, private router: Router) {
    }

    update() {
        this.refresh.next();
    }

    ngOnInit() {
        this.routerSubscription = this.route.data.subscribe(data => {
            const presentation: IadPresentation = data.presentation;
            this.presentationCode = data.presentation.code;
            this.projection = <IadListProjectionInterface>ProjectionsHelper
                .filterProjections(presentation, PROJECTION_TYPE.LIST)
                .find(_projection => _projection.code === data.projectionCode);

            this.columns = this.projection.columns;
            this.setDefaultFilter();
        });
    }

    setDefaultFilter() {
        const filter = this.searchEngine.createFilter('QUERY_STRING_QUERY');
        filter
            .addFilter('active', 'true', false)
            .addFilter('all', 'Иван', true)
            .addOption('allMatchDelegate');
        this.filter = filter;
    }

}
