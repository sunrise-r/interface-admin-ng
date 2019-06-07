import { CustomizeQuery } from '../filter-builder/action/customize-query';
import { AddOption } from '../filter-builder/action/add-option';
import { BuilderRaw } from '../filter-builder/model/raw';
import { ElasticSearchQueryBuilder } from './elastic-search-query.builder';
import { Operator } from './models/operator.model';
import { IQueryStatementBuilder } from './models/column-builder.interface';
import { statementTypes } from './operations/statement.factory';
import { Filter } from '../filter-builder/model/filter';
import { ColumnData } from './models/column-data.model';

export class QueryStringQueryWrapper implements CustomizeQuery {
    elasticQSQBuilder: ElasticSearchQueryBuilder;
    queryStatement: IQueryStatementBuilder;
    currentOperator: Operator;
    useWildCard: boolean;
    currentValue: any;
    builtString: string;
    constructor() {
        this.elasticQSQBuilder = new ElasticSearchQueryBuilder();
    }

    /**
     * @param name; Usage with operator: OR.name
     * @param value
     * @param useWildCard
     */
    addFilter(name: String, value: any, useWildCard?: boolean): AddOption {
        const nameArray = name.split('.');
        if (!this.queryStatement) {
            this.queryStatement = this.elasticQSQBuilder.addColumn(nameArray[1] ? nameArray[1] : nameArray[0]);
        } else {
            this.applyValues();
            this.queryStatement = this.queryStatement.addColumn(nameArray[1] ? nameArray[1] : nameArray[0]);
        }
        this.currentValue = value;
        this.useWildCard = useWildCard;
        this.currentOperator = nameArray[0] ? <Operator>nameArray[0] : Operator.AND;
        return this;
    }

    addOption(delegate: string, action: string, field: string): CustomizeQuery;
    addOption(delegate: string, action: string): CustomizeQuery;
    addOption(delegate: string): CustomizeQuery;
    addOption(delegate: string, action?: string, field?: string): CustomizeQuery {
        if (delegate === 'setStatementType') {
            this.queryStatement.setStatementType(<statementTypes>action);
            this.applyValues();
        } else if (delegate === 'addFromString') {
            if (!action) {
                action = this.currentValue;
            }
            this.builtString = (this.queryStatement ? this.queryStatement : this.elasticQSQBuilder).addFromString(action);
            this.clearTemp();
        }
        return this;
    }

    build(): String {
        if (this.builtString) {
            const result = this.builtString;
            this.builtString = null;
            return result;
        }
        return this.queryStatement.build();
    }

    merge(raw: BuilderRaw): CustomizeQuery {
        const filters = raw.filters.map(filter => {
            const nameArray = filter.field.split('.');
            return new ColumnData(nameArray[1] ? nameArray[1] : nameArray[0],
                                filter.value,
                        nameArray[1] ? <Operator>nameArray[0] : Operator.AND);
        });
        this.elasticQSQBuilder = this.elasticQSQBuilder.merge(filters);
        return this;
    }

    raw(): BuilderRaw {
        return new BuilderRaw(this.elasticQSQBuilder.raw().map(data => new Filter(`${data.operator}.${data.name}`, data.statement)));
    }

    private clearTemp() {
        this.currentOperator = Operator.AND;
        this.useWildCard = false;
        this.currentValue = null;
    }

    private applyValues() {
        if (this.currentValue) {
            Array.isArray(this.currentValue)
                ? this.queryStatement.addStatements(this.currentValue)
                : this.queryStatement.addStatement(this.currentValue, this.useWildCard, this.currentOperator);
            this.clearTemp();
        }
    }
}
