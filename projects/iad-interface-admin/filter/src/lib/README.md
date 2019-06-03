[InterfaceAdminNg](../../../../../README.md) / [Usage](../../../../../docs/2-usage-guide.md) / Filter

# Filter

Filter is separated in two modules: [elastic query-string-query](#query-string-query-builder) builder and [Filter builder](#filter-builder), made specially for one of our projects.

## Query string query builder 

As it was already written on official Elastic Search forum, raw query-string-query gets you into a funky local minima of work where you keep thinking "just one more regex and they won't be able to crash it". And eventually you end up with two dozen regexes that make query_string "safe" to expose. But that isn't a pleasant avenue to walk.

### Syntax

```typescript
const operatior = Operator.AND
const partialMatch = true;
const filter = (new ElasticFactory()).createFilter()
                .addColumn('name')
                .addStatement('Charles', partialMatch, operatior)
                .addColumn('surname')
                .addStatement('Lindbergh', partialMatch, operatior)
                .build();
```

will generate string `name:Charles* AND surname:Lindbergh*`;

Setting partialMatch to false will remove wildcard.

### Statement types

You can configure statement types:

* StatementTypes.notIn for 'NOT IN',
* StatementTypes.eq for '='

```typescript
const filter = (new ElasticFactory()).createFilter()
                .setStatementType(StatementTypes.notIn)
                .addColumn('name')
                .addStatement('Charles')
                .addColumn('surname')
                .addStatement('Lindbergh')
                .build();
```

will generate string `NOT(name:Charles AND surname:Lindbergh)`;

### Convert string to query string  

```typescript
const filter = (new ElasticFactory()).createFilter()
                .buildFromString('some fulltext search string')
```

will generate string with wildcards `some* fulltext* search* string*`;

### Angular service

You can use ElasticService to add service using Angular dependency injection:

```typescript
@Component()
export class Youcomponent {
    constructor(searchEngine: ElasticService) {}
    
    protected query(params) {
        ...
        const filter = this.searchEngine.createFilter()
                        .addColumn('name')
                        .addStatement('Charles')
                        .buildFromString('some fulltext search string'); // <- always concats with AND operator
    }
}
```

## Filter builder

Filter builder is not bound with elastic directly. You may use any search engine on your backend. But you have to implement its API by yourself.

```typescript
const useWildcard = true;
const filter = (new FilterBuilderFactory()).createFilter()
                .addFilter('name', 'ivan')
                .addOption('fioOrOperator')
                .addFilter('fio', 'ivan vse pochinit', useWildcard)
                .addOption('customSort', 'sort')
                .build();
```

will generate string `name=ivan&option=ivan,fioOrOperator,null&fio=ivan vse pochinit*&option=fio,customSort,sort`

Note, that you have to implement option handler by yourself.

### Merge two filter builders output

You can merge result of two FilterBuilders:

```typescript
const useWildcard = true;
const filter1 = (new FilterBuilderFactory()).createFilter()
                .addFilter('name', 'ivan')
                .addOption('fioOrOperator');

const filter2 = (new FilterBuilderFactory()).createFilter()
                .addFilter('fio', 'ivan vse pochinit', useWildcard)
                .addOption('customSort', 'sort');

const filter = filter2.merge(filter1.raw()).build();
``` 

### Angular service

You can use FilterBuilderService to add service using Angular dependency injection:

```typescript
@Component()
export class YourComponent {
    @Input() filter: CustomizeQuery;
    
    constructor(searchEngine: FilterBuilderService) {}
    
    protected query(params) {
        ...
        let filter = this.searchEngine.createFilter()
                        .addFilter('fio', 'ivan vse pochinit', useWildcard)
                        .addOption('customSort', 'sort');
        
        if (this.filter) {
            filter = filter.merge(this.filter.raw())
        }
        return filter.build();
    }
}
