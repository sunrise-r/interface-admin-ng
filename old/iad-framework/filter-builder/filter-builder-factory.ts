import { CustomizeQuery } from './action/customize-query';
import { FilterProvider } from './filter-provider';

export class FilterBuilderFactory {
    public createFilter(): CustomizeQuery {
        return new FilterProvider();
    }
}
