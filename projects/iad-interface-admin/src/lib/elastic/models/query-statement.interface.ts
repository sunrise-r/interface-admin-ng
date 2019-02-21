import { Operator } from '../models/operator.model';

export interface QueryStatement {
    columnName: string;

    addStatement(value: string): QueryStatement;
    addStatement(value: string, partialMatch: boolean): QueryStatement;
    addStatement(value: string, partialMatch: boolean, operator: Operator): QueryStatement;
    toString(): string;
}
