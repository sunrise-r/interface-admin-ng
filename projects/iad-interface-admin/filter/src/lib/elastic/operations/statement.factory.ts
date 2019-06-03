import { BasicQueryStatement } from './basic-query-statement';
import { NotInQueryStatement } from './not-in-query-statement';

export enum statementTypes {
    notIn = 'NOT IN',
    eq = '='
}

export class StatementFactory {
    static instance(columnName: string, statementType: string) {
        let statement;
        switch (statementType) {
            case statementTypes.notIn:
                statement = NotInQueryStatement;
                break;
            default:
                statement = BasicQueryStatement;
        }
        return new statement(columnName);
    }
}
