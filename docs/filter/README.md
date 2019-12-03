[InterfaceAdminNg](../../README.md) / [Usage](../2-usage-guide.md) / Filter

# Filter

Filter is separated in two modules: [elastic query-string-query](#query-string-query-builder) builder and [Filter builder](#filter-builder), made specially for one of our projects.


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
        let filter = this.searchEngine.createFilter('FILTER_BUILDER')
                        .addFilter('fio', 'ivan vse pochinit', useWildcard)
                        .addOption('customSort', 'sort');
        
        if (this.filter) {
            filter = filter.merge(this.filter.raw())
        }
        return filter.build();
    }
}
```


## Query string query builder 

As it was already written on official Elastic Search forum, raw query-string-query gets you into a funky local minima of work where you keep thinking "just one more regex and they won't be able to crash it". And eventually you end up with two dozen regexes that make query_string "safe" to expose. But that isn't a pleasant avenue to walk.

### Syntax

```typescript
const operatior = Operator.AND
const partialMatch = true;
const filter = (new ElasticSearchQueryBuilder())
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
const filter = (new ElasticSearchQueryBuilder())
                .addColumn('surname')
                .addStatement('Lindbergh')
                .addColumn('name')
                .setStatementType(StatementTypes.notIn)
                .addStatements(['Charles', 'John', 'Carl', 'Igor'])
                .build();
```

will generate string `NOT(name:Charles AND surname:Lindbergh)`;

### Convert string to query string  

```typescript
const filter = (new ElasticSearchQueryBuilder())
                .addFromString('some fulltext search string')
                .build();
```

will generate string with wildcards `some* fulltext* search* string*`;

### Angular service

You can use FilterBuilderService to add service using Angular dependency injection. Note, that syntax is the same as FilterBuilder. To set operator to concat statements add operator to the name, using 'dot' symbol. Available operators are OR and AND:

```typescript
@Component()
export class Youcomponent {
    constructor(searchEngine: FilterBuilderService) {}
    
    protected query(params) {
        ...
        const useWildcard = true;
        const filter = this.searchEngine.createFilter('QUERY_STRING_QUERY')
                        .addFilter('AND.name', 'Charles', useWildcard)
                        .addOption('setStatementType', StatementTypes.eq)
                        .addOption('addFromString', 'some fulltext search string')
                        .build(); // <- always concats with AND operator
    }
}
```

