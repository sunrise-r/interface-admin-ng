import { ColumnData } from './models/column-data.model';
import { Operator } from './models/operator.model';
import { ColumnBuilder, IQueryStatementBuilder } from './models/column-builder.interface';
import { QueryStatementBuilder } from './query-statement.builder';

/**
 * Билдер запроса к elastic search.
 *  Позволяет построить запрос к  серверу индексации на основе колонок.
 *  Пример запроса:
 *   service.addColumn('test').addStatemnt('statement')
 */
export class ElasticSearchQueryBuilder implements ColumnBuilder {
    private columns: Array<ColumnData>;

    static buildFromString(value: string): string {
        let val = value;
        val = val.replace(' ', '* ');
        return val + '*';
    }

    constructor() {
        this.columns = [];
    }

    build(): string {
        let query = '';
        let startBracket = false;
        let finishBracket = false;
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];

            if (i !== this.columns.length - 1) {
                if (column.name === this.columns[i + 1].name) {
                    if (!startBracket) {
                        query += '(';
                    }
                    startBracket = true;
                    column.operator = Operator.OR; // FUUUUUUUUUUUUU
                } else {
                    if (startBracket) {
                        finishBracket = true;
                    }
                }
            } else {
                if (startBracket) {
                    finishBracket = true;
                }
            }

            query += column.statement.toString();
            if (finishBracket) {
                startBracket = false;
                finishBracket = false;
                query += ') ';
            }
            query += ' ' + column.operator + ' ';
        }
        if (this.columns.length === 0) {
            return '*';
        }
        const result = query.substr(0, query.length - (2 + this.columns[this.columns.length - 1].operator.toLocaleString().length));
        this.columns = [];
        return result;
    }

    /**
     * Добавить клонку к строке поиска
     * @param columnName Название колонки
     */
    addColumn(columnName: string): IQueryStatementBuilder {
        const builder = new QueryStatementBuilder(columnName, this);
        this.columns.push(new ColumnData(columnName, builder, Operator.AND));
        return builder;
    }

    /**
     * Добавляет к строке с запросом buildFromString
     * @param condition
     */
    addFromString(condition: string): String {
        const build = this.build();
        return build.length > 0 ? [build, Operator.AND, ElasticSearchQueryBuilder.buildFromString(condition)].join(' ') : build;
    }
}
