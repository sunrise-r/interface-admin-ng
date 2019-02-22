import { Operator } from './operator.model';
import { IQueryStatementBuilder } from './column-builder.interface';

/**
 * Данные о колонке для запроса
 */
export class ColumnData {
    /**
     * Название колонки
     */
    private _name: string;

    /**
     * Список параметров поиска по колонке
     */
    private _statement: IQueryStatementBuilder;

    private _operator: Operator;

    /**
     * Конструктор
     * @param name Название колонки
     * @param statementBuilder билдер комманд поиска для колонки
     */
    constructor(name: string, statementBuilder: IQueryStatementBuilder, operator: Operator) {
        this._statement = statementBuilder;
        this._name = name;
        this._operator = operator;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get statement(): IQueryStatementBuilder {
        return this._statement;
    }

    set statement(value: IQueryStatementBuilder) {
        this._statement = value;
    }

    get operator(): Operator {
        return this._operator;
    }

    set operator(value: Operator) {
        this._operator = value;
    }
}
