import { statementTypes } from '../operations/statement.factory';
import { Operator } from './operator.model';

/**
 * Интерфейс добавления колонок к запросу
 */
export interface ColumnBuilder {
    /**
     * Добавить новую колоноку к запросу
     */
    addColumn(columnName: string): IQueryStatementBuilder;

    addFromString(condition: string): String;

    build(): String;
}
export interface IQueryStatementBuilder {
    columnName: string;

    /**
     * Добавить новую колоноку к запросу
     */
    addColumn(columnName: string): IQueryStatementBuilder;

    addFromString(condition: string): String;

    build(): String;

    setStatementType(statementType: statementTypes): IQueryStatementBuilder;

    toString(): string;

    addStatement(value: string, partialMatch?: boolean, operator?: Operator): IQueryStatementBuilder;
    toString(): string;
}