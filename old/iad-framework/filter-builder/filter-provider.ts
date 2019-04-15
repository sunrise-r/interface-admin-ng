import { AddFilter } from './action/add-filter';
import { AddOption } from './action/add-option';
import { BuildQuery } from './action/build-query';
import { CustomizeQuery } from './action/customize-query';
import { Filter } from './model/filter';
import { Option } from './model/option';
import { MergeQuery } from './action/merge-query';
import { BuilderRaw } from './model/raw';

export class FilterProvider implements AddFilter, AddOption, BuildQuery, CustomizeQuery, MergeQuery {
    private filters: Array<Filter> = [];

    private options: Array<Option> = [];

    private currentFilter: Filter = null;

    addFilter(name: String, value: any, useWildCard?: boolean): AddOption {
        if (this.currentFilter) {
            this.filters.push(this.currentFilter);
        }
        this.currentFilter = new Filter(name, value, useWildCard);
        return this;
    }

    addOption(delegate: string, action: string, field: string): CustomizeQuery;
    addOption(delegate: string, action: string): CustomizeQuery;
    addOption(delegate: string): CustomizeQuery;
    addOption(delegate: string, action?: string, field?: string): CustomizeQuery {
        if (action == null) {
            action = 'query';
        }
        let option = new Option();
        option.field = field;
        option.action = action;
        option.delegate = delegate;
        if (this.currentFilter) option.field = this.currentFilter.field;
        this.options.push(option);
        return this;
    }

    build(): String {
        if (this.filters.length === 0 && this.options.length === 0 && !this.currentFilter) {
            return '';
        }
        if (this.currentFilter) {
            this.filters.push(this.currentFilter);
            this.currentFilter = null;
        }
        let query = '';
        for (let i = 0; i < this.filters.length; i++) {
            query += this.filters[i].toQueryPart() + '&';
        }
        for (let i = 0; i < this.options.length; i++) {
            query += this.options[i].toQueryPart() + '&';
        }
        query = query.substr(0, query.length - 1);
        console.log('calculated query=' + query);
        return '?' + query;
    }

    raw(): BuilderRaw {
        if (this.currentFilter) {
            this.filters.push(this.currentFilter);
            this.currentFilter = null;
        }
        return {
            filters: this.filters,
            options: this.options
        };
    }

    merge(raw: { filters: Filter[]; options: Option[] }): CustomizeQuery {
        this.filters = this.filters.concat(raw.filters);
        this.options = this.options.concat(raw.options);
        return this;
    }
}
