import { Operator } from './operator.model';

/**
 *  Выражения параметра запроса для колонки.
 */
export class ColumnQueryStatement {
    private _value: string;
    private _operator: Operator;
    private _partialMatch: boolean;

    constructor(value: string, partialMatch?: boolean, operator?: Operator) {
        this._value = value;
        this._operator = operator;
        this._partialMatch = partialMatch;
    }

    get value(): string {
        return this._value;
    }
    set value(value: string) {
        this._value = value;
    }

    get operator(): Operator {
        return this._operator;
    }
    set operator(value: Operator) {
        this._operator = value;
    }

    get partialMatch(): boolean {
        return this._partialMatch;
    }
    set partialMatch(value: boolean) {
        this._partialMatch = value;
    }
}
