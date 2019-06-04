import { AbstractQueryStatement } from './abstract-query-statement';

export class NotInQueryStatement extends AbstractQueryStatement {
    toString() {
        if (this.statements.length === 0) {
            return '';
        }
        const reducer = columnName => (acu, statement) => {
            const operator = acu.length > 0 ? ` ${statement.operator} ` : '';
            return `${acu}${operator}${columnName}:${statement.value}`;
        };
        const result = this.statements.reduce(reducer(this.columnName), '');
        return `NOT(${result})`;
    }
}
