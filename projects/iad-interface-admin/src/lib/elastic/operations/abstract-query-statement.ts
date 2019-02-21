import { Operator } from '../models/operator.model';
import { QueryStatement } from '../models/query-statement.interface';
import { ColumnQueryStatement } from '../models/column-query-statement.model';

export abstract class AbstractQueryStatement implements QueryStatement {
    columnName: string;

    protected statements: Array<ColumnQueryStatement> = [];

    protected constructor(columnName) {
        this.columnName = columnName;
    }

    addStatement(value: string);
    addStatement(value: string, partialMatch: boolean);
    addStatement(value: string, partialMatch: boolean, operator: Operator);
    addStatement(value: string, partialMatch = false, operator?: Operator): QueryStatement {
        if (!operator) {
            operator = Operator.AND;
        }
        const st = new ColumnQueryStatement(value, partialMatch, operator);
        this.statements.push(st);
        return this;
    }
}
