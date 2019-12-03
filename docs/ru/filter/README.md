[InterfaceAdminNg](../../../README.md) / [Использование](../2-usage-guide.md) / Фильтр

# Фильтр

Фильтр разделён на два модуля: конструктор запросов [elastic query-string-query](#конструктор-query-string-query) и [Конструктор фильтров](#конструктор-запросов).

## Конструктор запросов

Конструктор запросов не связан с elastic. На стороне backend может быть использована абсолютно любая поисковая система. Но вам в любом случае потребуется самостоятельно реализовать её API на backend.

```typescript
const useWildcard = true;
const filter = (new FilterBuilderFactory()).createFilter()
                .addFilter('name', 'ivan')
                .addOption('fioOrOperator')
                .addFilter('fio', 'ivan vse pochinit', useWildcard)
                .addOption('customSort', 'asc')
                .build();
```

Сгненерирует строку `name=ivan&option=name,fioOrOperator,null&fio=ivan vse pochinit*&option=fio,customSort,asc`

На backend система должна распарсить строку, выбрав из неё мультизначные option. Для запроса, описанного выше, это две опции:

* name,fioOrOperator,null
* fio,customSort,sort

Из этих опций парсер на Backend должен распознать, что поиск имени и фио должен осуществляться через OR, а к ФИО нужно применить кастомную сортироку по возрастанию.

### Объединение двух результатов работы Конструктора запросов

Вы можете объединить два результата, сформированные конструктором запросов:

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

### Сервис Angular для инициализации FilterBuilder

Вы можете использовать FilterBuilderService, в своих компонентах Angular:

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

## Конструктор query string query 

На официальном форуме Elastic Search обсуждалось, что отправка с фронтенда прямых запросов query string query может привести к ложной уверенности, что несколько регулярных выражений для проверки запроса смогут решить проблему безопасности. И в конце концов вы делаете пару гигантских регулярных выражений, которые делают запросы query string query "безопасными". Но это не желательное использование этого функционала. 
Query string query рекомендуется использовать для тестирования работы с elastic search, но не рекомендуется использовать на production стенде.

### Синтаксис

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

Этот запрос сгенерирует строку `name:Charles* AND surname:Lindbergh*`;

Установка false в значение partialMatch уберёт звёздочку.

### Типы выражений

Вы можете указать в запросе тип выражения:

* StatementTypes.notIn для 'NOT IN',
* StatementTypes.eq для '='

```typescript
const filter = (new ElasticSearchQueryBuilder())
                .addColumn('surname')
                .addStatement('Lindbergh')
                .addColumn('name')
                .setStatementType(StatementTypes.notIn)
                .addStatements(['Charles', 'John', 'Carl', 'Igor'])
                .build();
```

Сгенерирует строку `NOT(name:Charles AND surname:Lindbergh)`;

### Сконвертировать строку в строку query string query

```typescript
const filter = (new ElasticSearchQueryBuilder())
                .addFromString('some fulltext search string')
                .build();
```

Сгенерирует строчку со звёздочками перед пробелом `some* fulltext* search* string*`;

### Сервис Angular для инициализации ElasticSearchQueryBuilder

Вы можете использовать FilterBuilderService, в своих компонентах Angular. Заметьте, что синтаксис совпадает с синтаксисом для FilterBuilder. 

Чтобы установить оператор для связки условий, добавьте его через точку перед именем поля фильтра. Доступные операторы OR и AND:

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

