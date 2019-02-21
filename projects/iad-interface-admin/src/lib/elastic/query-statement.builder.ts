import { QueryStatement } from './models/query-statement.interface';
import { ColumnBuilder, IQueryStatementBuilder } from './models/column-builder.interface';
import { Operator } from './models/operator.model';
import { StatementFactory, statementTypes } from './operations/statement.factory';

export class QueryStatementBuilder implements IQueryStatementBuilder {
    columnName: string;
    private statementType = statementTypes.eq;
    private cb: ColumnBuilder;
    private _statement: QueryStatement;

    constructor(columnName: string, cb: ColumnBuilder) {
        this.columnName = columnName;
        this.cb = cb;
    }

    addStatement(value: string): QueryStatementBuilder;
    addStatement(value: string, partialMatch: boolean): QueryStatementBuilder;
    addStatement(value: string, partialMatch: boolean, operator: Operator): QueryStatementBuilder;
    addStatement(value: string, partialMatch?: boolean, operator?: Operator): QueryStatementBuilder {
        this.statement().addStatement(value, partialMatch, operator);
        return this;
    }

    setStatementType(statementType: statementTypes): IQueryStatementBuilder {
        this.statementType = statementType;
        return this;
    }

    addStatements(values: string[]) {
        values.forEach(value => this.addStatement(value));
        return this;
    }

    addColumn(columnName: string): IQueryStatementBuilder {
        return this.cb.addColumn(columnName);
    }

    build(): String {
        return this.cb.build();
    }

    addFromString(condition: string): String {
        return this.cb.addFromString(condition);
    }

    toString(): string {
        return this.statement().toString();
    }

    private statement() {
        if (!this._statement) {
            this._statement = StatementFactory.instance(this.columnName, this.statementType);
        }
        return this._statement;
    }
}
