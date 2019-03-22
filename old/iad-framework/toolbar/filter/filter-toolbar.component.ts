import { Component, Input, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'app/shared';
import { Filter } from 'app/iad-framework/toolbar/filter/filter.model';
import { FilterCommunicationService } from 'app/iad-framework/toolbar/filter/filter-communication.service';
import { FilterQueryBuilderService } from 'app/iad-framework/toolbar/filter/filter-query-builder.service';
import { Principal } from 'app/core';

@Component({
    selector: 'iad-filter-toolbar-list',
    template: `
        <jhi-checkbox-list-component
            [items]="filters"
            statusField="status"
            labelField="title"
            (statusChange)="onFilterChange($event)"
        ></jhi-checkbox-list-component>`
})
@AutoUnsubscribe
export class FilterToolbarListComponent implements OnInit {
    @Input() filterList: { code: string; name: string }[] = [];

    filters: Filter[];

    constructor(
        private principal: Principal,
        private filterCommunicationService: FilterCommunicationService,
        private filterQueryBuilderService: FilterQueryBuilderService
    ) {}

    ngOnInit(): void {
        this.filters = this.filterList.map(filter => new Filter(filter.code, filter.name, true));
        this.principal.getAuthenticationState().subscribe(employee => {
            this.filterQueryBuilderService.currentEmployeeId = employee.currentEmployeeId;
            this.sendFilters();
        });
        this.principal.identity().then(employee => {
            this.filterQueryBuilderService.currentEmployeeId = employee.currentEmployeeId;
        });
    }

    onFilterChange(filter: Filter) {
        if (filter.name === 'ALL') {
            this.filters.forEach(f => (f.status = filter.status));
        } else {
            this.filters[0].status = !(this.filters.filter(f => !f.status && f.name !== 'ALL').length > 0);
        }
        this.sendFilters();
    }

    private sendFilters(): void {
        this.filterCommunicationService.sendMessage(this.filterQueryBuilderService.toQueryPart(this.filters));
    }
}
