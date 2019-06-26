import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {IadEventManager} from 'iad-interface-admin/core';

@Component({
    selector: 'iad-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {

    columns: IadGridColumn[];

    projection: IadListProjectionInterface;

    presentationCode: string;

    routerSubscription: Subscription;

    filter: CustomizeQuery;

    refresh: Subject<any> = new Subject();

    @ViewChild('iadProjectionGrid')
    iadProjectionGrid: any;

    deleteSubscription: Subscription;

    constructor(private route: ActivatedRoute, private searchEngine: DemoFilterBuilderService,
                private eventManager: IadEventManager) {
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
            this.deleteSubscription = this.eventManager.subscribe(data.projectionCode + '#recordDeleted', event => {
                console.log('Record deleted with id: ' + event.content['id']);
            });
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.deleteSubscription);
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
