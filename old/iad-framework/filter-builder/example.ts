import { FilterBuilderFactory } from './filter-builder-factory';

export class Example {
    public exampleBuild(): any {
        const builder = new FilterBuilderFactory();
        const query = builder
            .createFilter()
            .addFilter('name', 'ivan')
            .addOption('fioOrOperator')
            .addFilter('fio', 'ivan vse pochinit', false)
            .addOption('customSort', 'sort')
            .build();
    }
}
