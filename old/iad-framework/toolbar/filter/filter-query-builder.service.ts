import { Injectable } from '@angular/core';
import { Filter } from 'app/iad-framework/toolbar/filter/filter.model';

@Injectable({
    providedIn: 'root'
})
export class FilterQueryBuilderService {
    currentEmployeeId: number;

    /**
     * Generate query part for the filters
     * Expected: first filter is ALL
     */
    toQueryPart(filters: Filter[]): string {
        filters = filters.map(f => ({ ...f }));

        if (filters[0].status) {
            return 'projections:(*)';
        }
        let enabled = filters.filter(f => f.status);
        if (enabled.length === 0) {
            return 'projections:(empty)';
        }

        return (
            'projections:(' +
            this.onResolutionReplace(enabled)
                .map(x => x.name)
                .join(' OR ') +
            ')'
        );
    }

    /**
     * Replace resolution filter with employee id
     */
    private onResolutionReplace(filters: Filter[]): Filter[] {
        const filter = filters.find(f => f.name === 'resolution');
        if (filter) {
            filter.name = this.currentEmployeeId.toString();
        }
        return filters;
    }
}
