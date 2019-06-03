import { AbstractQueryStatement } from './abstract-query-statement';

/**
 * Билдер запроса для колонки.
 */
export class BasicQueryStatement extends AbstractQueryStatement {
    toString(): string {
        if (this.statements.length === 0) {
            return '';
        }
        const reducer = columnName => (acu, statement) => {
            const operator = acu.length > 0 ? ` ${statement.operator} ` : '';
            return `${acu}${operator}${columnName}:${this.createQueryValue(statement.value, statement.partialMatch)}`;
        };
        const result = this.statements.reduce(reducer(this.columnName), '');
        return this.statements.length > 1 ? `(${result})` : result;
    }

    private createQueryValue(value: string, partialMatch: boolean): string {
        return partialMatch ? value + '*' : value;
    }
}
