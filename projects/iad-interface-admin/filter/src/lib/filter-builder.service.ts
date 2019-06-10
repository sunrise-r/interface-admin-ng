import { Injectable, InjectionToken, Type } from '@angular/core';
import { FilterProvider } from './filter-builder/filter-provider';
import { QueryStringQueryWrapper } from './elastic/query-string-query-wrapper';
import { CustomizeQuery } from './filter-builder/action/customize-query';

export const searchFilterFactory = {
    QUERY_STRING_QUERY: QueryStringQueryWrapper,
    FILTER_BUILDER: FilterProvider
};

export interface BuildOptions {
    globalFilter?: string;
    filters?: {[p: string]: {value: string, useWildcard?: boolean}};
}

export interface FilterBuilderInterface {
    createFilter(type?: string): CustomizeQuery;
    merge(builder: CustomizeQuery): FilterBuilderInterface;
    build(options: BuildOptions): string;
    beforeBuildHook(options: BuildOptions): boolean;
    afterBuildHook();
}

export const FILTER_BUILDER = new InjectionToken<FilterBuilderInterface>('Filter builder');

export class FilterBuilderService implements FilterBuilderInterface {
    builder: CustomizeQuery;

    createFilter(type?: string): CustomizeQuery {
        if (!type) {
            type = 'QUERY_STRING_QUERY';
        }
        this.builder = new searchFilterFactory[type]();
        return this.builder;
    }

    merge(builder: CustomizeQuery): FilterBuilderInterface {
        this.builder.merge(builder.raw());
        return this;
    }

    build(options: BuildOptions): string {
        if (this.beforeBuildHook(options)) {
            if (options.filters) {
                Object.keys(options.filters)
                    .forEach((field: string) => {
                        const value = options.filters[field].value;
                        this.builder.addFilter(field, value, options.filters[field].useWildcard);
                    });
            }
        }
        this.afterBuildHook();
        return this.builder.build();
    }

    /**
     * Should return true if you want to add options.filters to the builder
     * @param options
     */
    beforeBuildHook(options: BuildOptions): boolean {
        if (options.globalFilter && options.globalFilter !== '') {
            this.builder.addFilter('all', options.globalFilter, false).addOption('allMatchDelegate');
            return false;
        }
        return true;
    }

    afterBuildHook() {}
}
