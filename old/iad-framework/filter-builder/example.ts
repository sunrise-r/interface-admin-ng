import { FilterBuilderFactory } from './filter-builder-factory';

export class Example {
    public exampleBuild(): any {
        var builder = new FilterBuilderFactory();
        let query = builder
            .createFilter()
            .addFilter('name', 'ivan')
            .addOption('fioOrOperator')
            .addFilter('fio', 'ivan vse pochinit', false)
            .addOption('customSort', 'sort')
            .build();
    }
}
