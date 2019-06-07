import { Injectable } from '@angular/core';
import { FilterProvider } from './filter-builder/filter-provider';
import { QueryStringQueryWrapper } from './elastic/query-string-query-wrapper';
import { CustomizeQuery } from './filter-builder/action/customize-query';

export enum SEARCH_FILTER_TYPE {
    QSQ = 0,
    FILTER_BUILDER = 1
}

export const searchFilterFactory = [
    QueryStringQueryWrapper,
    FilterProvider
];

@Injectable()
export class FilterBuilderService {
    public createFilter(type: SEARCH_FILTER_TYPE): CustomizeQuery {
        return new searchFilterFactory[type]();
    }
}
